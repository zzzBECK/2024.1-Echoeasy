import { router, useLocalSearchParams } from "expo-router";
import * as ScreenCapture from "expo-screen-capture";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Loader from "../../../components/Loader";
import { SubjectService } from "../../../src/service/SubjectService";

type Item = {
  _id: string;
  title: string;
  description: string;
  image: string;
  algorithm_link: string;
};

const SubjectId: React.FC = () => {
  const { subjectId } = useLocalSearchParams();
  const [content, setContent] = useState<Item>();
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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
    const blockScreenCapture = async () => {
      await ScreenCapture.preventScreenCaptureAsync();
    };

    fetchContent();
    blockScreenCapture();

    return () => {
      const allowScreenCapture = async () => {
        await ScreenCapture.allowScreenCaptureAsync();
      };
      allowScreenCapture();
    };
  }, [subjectId]);

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
            <View className="w-full">
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image
                  source={{ uri: content.image }}
                  style={{ width: "100%", height: 280 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          )}
          {content.algorithm_link && (
            <View className="flex-1 justify-end items-end p-2">
            <TouchableOpacity
              onPress={() => router.navigate(`/(algorithms)/${content.algorithm_link}`)}
              className="bg-[#3CC1A9] rounded-lg py-2 px-4 shadow-md"
            >
              <Text className="text-white font-interMedium text-center">Ir ao algoritmo</Text>
            </TouchableOpacity>
          </View>
          )}
        </View>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            }}
            onPress={() => setModalVisible(false)}
          >
            <Image
              source={{ uri: content.image }}
              style={{ width: "100%", height: "80%" }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default SubjectId;
