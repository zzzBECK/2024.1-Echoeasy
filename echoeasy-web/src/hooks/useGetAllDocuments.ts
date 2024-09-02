import { getAllDocuments } from "@/services/documents";
import useSWR, { KeyedMutator } from "swr";

export function useGetAllDocuments(): {
  data: any | undefined;
  error: any;
  isLoading: boolean;
  mutate: KeyedMutator<any>;
} {
  const fetchKey = `get-all-documents`;

  const fetcher = async (): Promise<any> => {
    try {
      return await getAllDocuments();
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
