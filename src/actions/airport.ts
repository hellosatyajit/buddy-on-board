import { Airport } from "@/lib/types";

interface ResponseAirport {
  success: boolean;
  length: number;
  data: Airport[];
}

export async function getAirports(q: string): Promise<ResponseAirport> {
  const response = await fetch(
    `https://airport.satyajit.xyz/search?q=${encodeURI(q)}`,
  );
  const data = await response.json();
  return data;
}
