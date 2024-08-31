import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SubItemCard from "../../components/SubItemCard";
import { DocService } from "../../src/service/DocService";
import { SubjectService } from "../../src/service/SubjectService";

type Item = {
  _id: string;
  title: string;
  description: string;
  image: string;
};

const DocumentId: React.FC = () => {
  const { documentId } = useLocalSearchParams();
  const [subjects, setSubjects] = useState<Item[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [document, setDocument] = useState<Item>()

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchSubjects();
    setRefreshing(false);
  };

  const fetchDocument = async () => {
    try {
      const docService = new DocService();
      const response = await docService.readDocument(documentId as string);
      setDocument(response.data as Item);

    } catch (error: any){
      console.error("Error fetching document:", error.message || error);
    }
  }

  const fetchSubjects = async () => {
    try {
      const subjectService = new SubjectService();
      const response = await subjectService.getAllSubjectsOfTheDocument(
        documentId as string
      );
      setSubjects(response.data as Item[]);
    } catch (error: any) {
      console.error("Error fetching subjects:", error.message || error);
    }
  };

  useEffect(() => {
    fetchDocument();
    fetchSubjects();
  }, []);

  return (
    <SafeAreaView className="bg-[#F6F6F6] h-full px-6">
      <View className="w-full h-full flex">
        <Text className="font-interMedium text-2xl">{document?.title}</Text>

        <FlatList
          data={subjects}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <SubItemCard
              title={item.title}
              handlePress={() => router.push(`(subjects)/${item._id}`)}
            />
          )}
          ListEmptyComponent={() => (
            <View className="flex justify-center items-center px-4">
              <Text className="p-6 font-interLight text-base">
                Ainda não há assuntos.
              </Text>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default DocumentId;
