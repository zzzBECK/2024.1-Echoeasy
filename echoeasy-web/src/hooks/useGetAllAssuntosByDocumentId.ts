import { getAllAssuntosByDocumentId } from "@/services/assuntos";
import useSWR, { KeyedMutator } from "swr";

export function useGetAllAssuntosByDocumentId(documentId: string): {
  data: any | undefined;
  error: any;
  isLoading: boolean;
  mutate: KeyedMutator<any>;
} {
  const fetchKey = `get-all-assuntos-by-document-id-${documentId}`;

  const fetcher = async (): Promise<any> => {
    try {
      return await getAllAssuntosByDocumentId(documentId);
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
