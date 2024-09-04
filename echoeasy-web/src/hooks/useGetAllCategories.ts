import { getAllCategories } from "@/services/categorias";
import useSWR, { KeyedMutator } from "swr";

export function useGetAllCategories(): {
  data: any | undefined;
  error: any;
  isLoading: boolean;
  mutate: KeyedMutator<any>;
} {
  const fetchKey = `get-all-categories`;

  const fetcher = async (): Promise<any> => {
    try {
      return await getAllCategories();
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
