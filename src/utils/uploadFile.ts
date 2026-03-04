import axios from "axios";

const getResourceType = (file: File): "image" | "video" | "auto" => {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";

  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
  if (["mp4", "mov", "avi", "mkv"].includes(ext)) return "video";

  // pdf and other docs → let Cloudinary auto-detect
  return "auto";
};

export const uploadFile = async (file: File) => {
  const resourceType = getResourceType(file);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ResQ_SOS");

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/dezgwdrfs/${resourceType}/upload`,
    formData,
  );

  return {
    url: res.data.secure_url,
    format: res.data.format as string,
    resourceType: res.data.resource_type as string,
  };
};
