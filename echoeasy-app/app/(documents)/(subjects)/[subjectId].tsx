import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, RefreshControl, ScrollView, Text, View } from "react-native";
import Loader from "../../../components/Loader";
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
    return <Loader isLoading={true} />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="bg-[#F6F6F6] h-full w-full px-6">
        <View key={content._id} className="mb-4">
          <Text className="font-interMedium text-2xl mb-2 text-center">
            {content.title}
          </Text>
          <Text className="mb-2 text-justify">{content.description}</Text>
          {content.image && (
            <Image
              source={{ uri: content.image }}
              className="w-full h-96"
              resizeMode="contain"
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default SubjectId;
