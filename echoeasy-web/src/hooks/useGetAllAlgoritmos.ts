import { getAllAlgoritmos } from "@/services/algoritmos";
import useSWR, { KeyedMutator } from "swr";

export function useGetAllAlgoritmos(): {
  data: any | undefined;
  error: any;
  isLoading: boolean;
  mutate: KeyedMutator<any>;
} {
  const fetchKey = `get-all-algoritmos`;

  const fetcher = async (): Promise<any> => {
    try {
      return await getAllAlgoritmos();
    } catch (error: unknown) {
      console.error("Erro ao buscar dados de algoritmos:", error);
      throw error;
    }
  };

  const { data, error, isLoading, mutate } = useSWR<any>(fetchKey, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  return { data, error, isLoading, mutate };
}
