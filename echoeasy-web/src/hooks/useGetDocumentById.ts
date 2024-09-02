import { getDocumentById } from "@/services/documents";
import useSWR, { KeyedMutator } from "swr";

export function useGetDocumentById(documentId: string): {
  data: any | undefined;
  error: any;
  isLoading: boolean;
  mutate: KeyedMutator<any>;
} {
  const fetchKey = `get-document-by-id-${documentId}`;

  const fetcher = async (): Promise<any> => {
    try {
      return await getDocumentById(documentId);
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
