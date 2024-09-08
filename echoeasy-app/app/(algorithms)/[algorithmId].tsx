import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import CustomButton from "../../components/CustomButton";
import { AlgorithmService } from "../../src/service/AlgorithmService";

interface Item {
  _id: string;
  title: string;
  description: string;
  botLink: string;
  referenceLink: string;
}

const Algorithm: React.FC = () => {
  const { algorithmId } = useLocalSearchParams();
  const [algorithm, setAlgorithm] = useState<Item | null>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fetchSubjects = async () => {
    try {
      const subjectService = new AlgorithmService();
      const response = await subjectService.getAlgorithmById(
        algorithmId as string
      );
      setAlgorithm(response.data);
    } catch (error: any) {
      console.error("Error fetching subjects:", error.message || error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleStartAlgorithm = () => {
    if (!isOpened) {
      setIsOpened(true);
    } else {
      setIsOpened(false);
    }
  };

  const openReferenceLink = () => {
    if (algorithm?.referenceLink) {
      Linking.openURL(algorithm.referenceLink).catch((err) =>
        console.error("Failed to open link:", err)
      );
    }
  };

  if (!algorithm) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView
      className="flex flex-col justify-between"
      style={styles.safeArea}
    >
      <View style={styles.header}>
        {!isOpened && (
          <>
            <Text style={styles.title}>{algorithm.title}</Text>
            <Text style={styles.description}>{algorithm.description}</Text>
          </>
        )}
        <View className={`${isOpened ? "mt-0" : "mt-10"} w-full`}>
          <CustomButton
            title={isOpened ? "Fechar" : "Iniciar Algoritmo"}
            isDisabled={false}
            isLoading={false}
            handlePress={handleStartAlgorithm}
          />
        </View>
      </View>

      {isOpened && (
        <View style={styles.container}>
          <WebView
            cacheEnabled={false}
            domStorageEnabled={true}
            scrollEnabled={false}
            incognito={true}
            key={algorithm._id}
            source={{ uri: algorithm.botLink }}
            style={{ flex: 1 }}
            javaScriptEnabled={true}
            scalesPageToFit={true} // Ajusta o conteúdo ao tamanho da tela
            useWebKit={true} // Garante compatibilidade com WebKit
            injectedJavaScript={`
              document.body.style.overflow = 'hidden';
              true;
            `}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn("WebView error: ", nativeEvent);
            }}
            onHttpError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn("WebView HTTP error: ", nativeEvent);
            }}
          >
            <View className="w-full h-full flex justify-center items-center bg-[#F6F6F6]">
              <ActivityIndicator
                className="text-sm self-center"
                color="#3CC1A9"
              />
            </View>
          </WebView>
        </View>
      )}

      {!isOpened && (
        <View>
          <CustomButton
            title="Referência"
            isDisabled={false}
            isLoading={false}
            handlePress={openReferenceLink}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  header: {
    marginTop: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Algorithm;
