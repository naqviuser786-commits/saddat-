import { supabase, PRODUCT_BUCKET } from "./supabase";
import type { Category, Product, Order } from "../types/content";

function db() {
  if (!supabase) throw new Error("Supabase env keys missing (.env)");
  return supabase;
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await db().from("products").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await db().from("products").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data as Product | null;
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await db().from("categories").select("*").order("name");
  if (error) throw error;
  return data as Category[];
}

export async function createOrder(order: Omit<Order, "id" | "created_at" | "status">) {
  const { error } = await db().from("orders").insert({ ...order, status: "pending" });
  if (error) throw error;
}

/** Uploads to Supabase Storage and returns the public URL. */
export async function uploadProductImage(file: File): Promise<string> {
  const client = db();
  const path = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const { error } = await client.storage.from(PRODUCT_BUCKET).upload(path, file);
  if (error) throw error;
  return client.storage.from(PRODUCT_BUCKET).getPublicUrl(path).data.publicUrl;
}