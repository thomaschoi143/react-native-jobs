import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { useState, useEffect } from "react";

import styles from "./footer.style";
import { icons } from "../../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Footer = ({ jobId, url }) => {
  const [likeStatus, setLikeStatus] = useState(false);

  const getLikeStatus = async () => {
    try {
      const likeStatusStr = await AsyncStorage.getItem(jobId);
      return likeStatusStr === 'true';
    } catch(error) {
      console.log(error);
    }
  }

  const toggleLike = async () => {
    const status = !likeStatus;
    try {
      await AsyncStorage.setItem(jobId, JSON.stringify(status));
      setLikeStatus(status);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (jobId) {
      getLikeStatus().then((status) => setLikeStatus(status));
    }
  }, [jobId])

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.likeBtn(likeStatus)}
        onPress={toggleLike}
      >
        <Image
          source={icons.heartOutline}
          resizeMode='contain'
          style={styles.likeBtnImage(likeStatus)}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => Linking.openURL(url)}
      >
        <Text style={styles.applyBtnText}>Apply for job</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
