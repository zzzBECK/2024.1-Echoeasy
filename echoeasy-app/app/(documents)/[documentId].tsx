import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
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
      <View className="bg-[#F6F6F6] w-full h-full flex px-6 pb-6">
        <Text className="font-interMedium text-center text-2xl mb-1">{document?.title}</Text>
      
        <FlatList
          data={subjects}
          showsVerticalScrollIndicator={false}
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
  );
};

export default DocumentId;
