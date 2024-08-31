import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SubjectService } from "../../../src/service/SubjectService";

type Item = {
  _id: string;
  title: string;
  description: string;
  image: string;
};

const SubjectId: React.FC = () => {
  const { subjectId } = useLocalSearchParams();
  const [content, setContent] = useState<Item>();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchContent();
    setRefreshing(false);
  };

  const fetchContent = async () => {
    try {
      const subjectService = new SubjectService();
      const response = await subjectService.getSubjectContent(
        subjectId as string
      );
      setContent(response.data as Item);
    } catch (error: any) {
      console.error("Error fetching subjects:", error.message || error);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  if (!content) {
    return (
      <View>
        <Text>"Loading..."</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-[#F6F6F6] h-full">
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <View className="w-full px-6">
          <View key={content._id} className="mb-4">
            <Text className="font-interMedium text-2xl mb-2 text-center">
              {content.title}
            </Text>
            <Text className="mb-2 text-center">{content.description}</Text>
            {content.image && (
              <Image source={{ uri: content.image }} className="w-full h-96" />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubjectId;
