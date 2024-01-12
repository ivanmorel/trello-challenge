import axiosClient from "./axios";
import { groupsApiUrl } from "../config";

const getGroups = async () => await axiosClient.get(groupsApiUrl);

const createGroup = async (body: any) => await axiosClient.post(groupsApiUrl, body);

const updateGroup = async (body: any) => await axiosClient.put(groupsApiUrl, body);

const deleteGroup = async (id: string) => await axiosClient.delete(groupsApiUrl, { data: { id } });

export {
  getGroups,
  createGroup,
  updateGroup,
  deleteGroup,
}