export type HealthResponse = {
  status: string;
  model: string;
  classes: number;
  version: string;
  api_enabled: boolean;
};

export type ModelInfoResponse = {
  model_name: string;
  model_path: string;
  class_names_path: string;
  classes: number;
  image_size: number;
  resize_size: number;
  api_enabled: boolean;
  gradcam_default: boolean;
  device: string;
};

export type ClassesResponse = {
  classes: string[];
};

export type PredictResponse = {
  status: "accepted" | "rejected" | string;
  label: string;
  confidence: number;
  all_probs: Record<string, number>;
  top_k: Array<[string, number]>;
  gradcam?: string | null;
  regulation?: string | null;
  recommendation?: string[] | null;
  hazard_level?: "high" | "medium" | "low" | null;
  rejection_reason?: string | null;
  message?: string | null;
  prediction_id?: number | string | null;
};

export type FeedbackPayload = {
  prediction_id: string;
  is_correct: boolean;
  user_comment?: string | null;
};

export type FeedbackResponse = {
  status: string;
  message: string;
};

export class ApiConfigError extends Error {
  constructor() {
    super("NEXT_PUBLIC_API_BASE_URL belum diatur. Isi environment variable frontend terlebih dahulu.");
    this.name = "ApiConfigError";
  }
}

function getApiBaseUrl() {
  const value = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (!value) throw new ApiConfigError();
  return value.replace(/\/+$/, "");
}

function getHeaders(isJson = false) {
  const headers = new Headers();
  const apiKey = process.env.NEXT_PUBLIC_API_KEY?.trim();
  if (apiKey) headers.set("X-API-Key", apiKey);
  if (isJson) headers.set("Content-Type", "application/json");
  return headers;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload && "detail" in payload
        ? String(payload.detail)
        : `API error ${response.status}`;
    throw new Error(message);
  }

  return payload as T;
}

export async function getHealth() {
  const response = await fetch(`${getApiBaseUrl()}/health`, {
    headers: getHeaders(),
    cache: "no-store",
  });
  return parseResponse<HealthResponse>(response);
}

export async function getModelInfo() {
  const response = await fetch(`${getApiBaseUrl()}/model-info`, {
    headers: getHeaders(),
    cache: "no-store",
  });
  return parseResponse<ModelInfoResponse>(response);
}

export async function getClasses() {
  const response = await fetch(`${getApiBaseUrl()}/classes`, {
    headers: getHeaders(),
    cache: "no-store",
  });
  return parseResponse<ClassesResponse>(response);
}

export async function predictImage(file: File, includeGradcam: boolean) {
  const formData = new FormData();
  formData.append("file", file);

  const params = new URLSearchParams({
    include_gradcam: String(includeGradcam),
  });

  const response = await fetch(`${getApiBaseUrl()}/predict?${params.toString()}`, {
    method: "POST",
    headers: getHeaders(),
    body: formData,
  });

  return parseResponse<PredictResponse>(response);
}

export async function submitFeedback(payload: FeedbackPayload) {
  const response = await fetch(`${getApiBaseUrl()}/feedback`, {
    method: "POST",
    headers: getHeaders(true),
    body: JSON.stringify(payload),
  });

  return parseResponse<FeedbackResponse>(response);
}
