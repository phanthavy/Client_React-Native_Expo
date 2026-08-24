import { postProductThunks } from "@/store/slices/product/productThunk";
import { AppDispatch } from "@/store/store";
import Ionicons from "@expo/vector-icons/Ionicons";
import { isAxiosError } from "axios";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

type PrductType = {
  product_name: string;
  product_description: string;
  product_price: string;
  product_image: string[];
};

const initailForm: PrductType = {
  product_name: "",
  product_description: "",
  product_price: "",
  product_image: [],
};

const CreateProduct = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const textColor = isDark ? "#F5F5F7" : "#1D1D1F";
  const fieldBg = isDark ? "#F5F5F7" : "#1D1D1F";
  const fieldTextColor = isDark ? "#57575c" : "#F5F5F7";

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState(initailForm);
  const [select, setSelect] = useState("select");

  const options = ["shirt", "pant", "accessory", "hat", "glasses"];

  const dispactch = useDispatch<AppDispatch>();

  const setField = (
    name: Exclude<keyof PrductType, "product_image">,
    value: string,
  ) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.6,
      base64: true,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

    if (result.canceled) return;

    const images = result.assets
      .filter((asset) => asset.base64)
      .map((asset) => {
        const mime = asset.mimeType ?? "image/jpeg";
        return `data:${mime};base64,${asset.base64}`;
      });

    setForm((prev) => ({
      ...prev,
      product_image: [...prev.product_image, ...images],
    }));
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      product_image: prev.product_image.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    const paylaod = {
      product_name: form.product_name,
      product_description: form.product_description,
      product_price: Number(form.product_price.replaceAll(",", "")),
      product_image: form.product_image,
    };

    try {
      const result = await dispactch(postProductThunks(paylaod)).unwrap();
      console.log(result);
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error.response?.data?.message || error.message);
      } else console.error("An unexpected error occured");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: isDark ? "#1C1C1E" : "#FAFAFA" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Basic Details
        </Text>

        <View style={styles.row}>
          <Text style={[styles.label, { color: textColor }]}>Product Name *</Text>
          <TextInput
            style={[styles.field, { backgroundColor: fieldBg }]}
            placeholder="Enter product name"
            placeholderTextColor={isDark ? "#71717A" : "#A1A1AA"}
            value={form.product_name}
            onChangeText={(e) => setField("product_name", e)}
          />
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, { color: textColor }]}>Category *</Text>
          <Pressable
            onPress={() => {
              return setOpen((prev) => !prev);
            }}
            style={[
              styles.field,
              {
                backgroundColor: fieldBg,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              },
            ]}
          >
            <Text style={{ color: fieldTextColor }}>{select}</Text>
            {open ? <Ionicons name="caret-up" /> : <Ionicons name="caret-down" />}
          </Pressable>
        </View>
        {open && (
          <View style={styles.openCategory}>
            {options.map((cate) => {
              return (
                <Pressable
                  key={cate}
                  onPress={() => {
                    return (setOpen(false), setSelect(cate));
                  }}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#e5e5e5" : "",
                    },
                  ]}
                >
                  <Text style={{ padding: 10 }}>{cate}</Text>
                </Pressable>
              );
            })}
          </View>
        )}

        <View style={styles.row}>
          <Text style={[styles.label, { color: textColor }]}>Description</Text>
          <TextInput
            multiline
            value={form.product_description}
            onChangeText={(e) => setField("product_description", e)}
            style={[styles.textArea, styles.field]}
            placeholder="Enter description..."
            placeholderTextColor={fieldTextColor}
          />
        </View>

        <Text style={[styles.sectionTitle, { color: textColor }]}>Price</Text>
        <View style={styles.row}>
          <Text style={[styles.label, { color: textColor }]}>Price ($) *</Text>
          <TextInput
            keyboardType="decimal-pad"
            placeholder="0.000KIP"
            placeholderTextColor={fieldTextColor}
            style={[styles.field, { backgroundColor: fieldBg }]}
            value={form.product_price}
            onChangeText={(e) => {
              const numeric = e.replace(/\D/g, "");
              const formatted = numeric
                ? Number(numeric).toLocaleString("en-US")
                : "";
              return setField("product_price", formatted);
            }}
          />
          <Text style={{ color: textColor }}>KIP</Text>
        </View>

        <View style={styles.imageRow}>
          <Text style={[styles.label, { color: textColor }]}>Image *</Text>
          <View style={styles.imageGrid}>
            {form.product_image.map((img, index) => (
              <Pressable
                key={`${index}-${img.slice(0, 24)}`}
                onPress={() => removeImage(index)}
                style={styles.imageCell}
              >
                <Image source={{ uri: img }} style={styles.imageThumb} />
              </Pressable>
            ))}

            <Pressable
              onPress={pickImage}
              style={[
                styles.imageCell,
                styles.addImage,
                { backgroundColor: fieldBg },
              ]}
            >
              <Ionicons name="add" size={32} color={fieldTextColor} />
            </Pressable>
          </View>
        </View>

        <Pressable
          onPress={handleSubmit}
          style={({ pressed }) => [
            styles.submitButton,
            { opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <Text style={styles.submitText}>Create Product</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  content: {
    paddingBottom: 40,
  },
  sectionTitle: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    gap: 8,
    marginTop: 20,
    alignItems: "center",
  },
  label: {
    width: 110,
    fontSize: 15,
  },
  field: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
  },
  openCategory: {
    position: "absolute",
    top: 145,
    left: 130,
    right: 20,
    width: 285,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    zIndex: 1000,
    elevation: 5,
  },
  textArea: {
    height: 120,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    textAlignVertical: "top",
  },
  imageRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 20,
  },
  imageGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  imageCell: {
    width: "48%",
    aspectRatio: 1,
  },
  imageThumb: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  addImage: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButton: {
    marginTop: 24,
    backgroundColor: "#2563EB",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
