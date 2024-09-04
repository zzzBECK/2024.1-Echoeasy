import { getAssuntoById } from "@/services/assuntos";
import useSWR, { KeyedMutator } from "swr";

export function useGetAssuntoById(assuntoId: string): {
  data: any | undefined;
  error: any;
  isLoading: boolean;
  mutate: KeyedMutator<any>;
} {
  const fetchKey = `get-assunto-by-id-${assuntoId}`;

  const fetcher = async (): Promise<any> => {
    try {
      return await getAssuntoById(assuntoId);
    } catch (error: unknown) {
      console.error("Erro ao buscar dados de documentos:", error);
      throw error;
    }
  };

  const { data, error, isLoading, mutate } = useSWR<any>(fetchKey, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  return { data, error, isLoading, mutate };
}
