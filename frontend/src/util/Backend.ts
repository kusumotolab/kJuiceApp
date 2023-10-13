import axios from "axios";
import { Chat, Item, Member, History, Bill } from "types";

export class Backend {
  private static readonly BASE = "./backend/";

  public static async addItem(
    id: string,
    name: string,
    sellingPrice: number,
    costPrice: number,
    category: string
  ) {
    const endpoint = "items";
    const data = {
      id,
      name,
      sellingPrice,
      costPrice,
      category,
    };

    // TODO responseによる成否判定
    return await axios
      .post(Backend.BASE + endpoint, data)
      .then(() => true)
      .catch(() => false);
  }

  public static async getItemList(): Promise<Item[] | null> {
    const endpoint = "items";

    return await axios
      .get(Backend.BASE + endpoint)
      .then((res) => res.data)
      .catch(() => null);
  }

  public static async setItemActivity(id: string, activity: boolean) {
    const endpoint = `items/${id}`;
    const data = {
      active: activity,
    };

    // TODO 成否判定
    return await axios
      .patch(Backend.BASE + endpoint, data)
      .then(() => true)
      .catch(() => false);
  }

  public static async deleteItem(id: string) {
    const endpoint = `items/${id}`;

    // TODO 成否判定
    return await axios
      .delete(Backend.BASE + endpoint)
      .then(() => true)
      .catch(() => false);
  }

  public static async getMemberList(): Promise<Member[] | null> {
    const endpoint = "members";

    return await axios
      .get(Backend.BASE + endpoint)
      .then((res) => res.data)
      .catch(() => null);
  }

  public static async addMember(id: string, name: string, attribute: string) {
    const endpoint = "members";
    const data = {
      id,
      name,
      attribute,
    };

    // TODO 成否判定
    return await axios
      .post(Backend.BASE + endpoint, data)
      .then(() => true)
      .catch(() => false);
  }

  public static async setMemberActivity(id: string, active: boolean) {
    const endpoint = `members/${id}`;
    const data = {
      active,
    };

    // TODO 成否判定
    return await axios
      .patch(Backend.BASE + endpoint, data)
      .then(() => true)
      .catch(() => false);
  }

  public static async deleteMember(id: string) {
    const endpoint = `members/${id}`;

    // TODO 成否判定
    return await axios
      .delete(Backend.BASE + endpoint)
      .then(() => true)
      .catch(() => false);
  }

  public static async deleteChat(id: number) {
    const endpoint = `messages/${id}`;

    // TODO 成否判定
    return await axios
      .delete(Backend.BASE + endpoint)
      .then(() => true)
      .catch(() => false);
  }

  public static async getMessageList(): Promise<Chat[] | null> {
    const endpoint = `messages`;

    return await axios
      .get(Backend.BASE + endpoint)
      .then((res) => res.data)
      .catch(() => null);
  }

  public static async addMessage(message: string) {
    const endpoint = "messages";
    const data = {
      message,
    };

    return await axios
      .post(Backend.BASE + endpoint, data)
      .then(() => true)
      .catch(() => false);
  }

  // public static async getHistoryEachMonth(): Promise<LabeledHistory | null> {
  //   return null;
  // }

  public static async getUserHistory(id: string): Promise<History[] | null> {
    const endpoint = "purchases";
    const data = {
      params: {
        memberId: id,
      },
    };

    return await axios
      .get(Backend.BASE + endpoint, data)
      .then((res) => res.data)
      .catch(null);
  }

  public static async recall(historyId: number) {
    const endpoint = `purchases/${historyId}`;

    return await axios
      .delete(Backend.BASE + endpoint)
      .then(() => true)
      .catch(() => false);
  }

  public static async purchase(memberId: string, itemId: string) {
    const endpoint = "purchases";
    const data = {
      memberId,
      itemId,
    };

    return await axios
      .post(Backend.BASE + endpoint, data)
      .then(() => true)
      .catch(() => false);
  }

  public static async setMemberImage(memberId: string, image: File) {
    const endpoint = `members/${memberId}/image`;
    const data = new FormData();
    data.append("image", image);

    return await axios
      .put(Backend.BASE + endpoint, data)
      .then(() => true)
      .catch(() => false);
  }

  public static async getMemberImage(memberId: string): Promise<Blob | null> {
    const endpoint = `members/${memberId}/image`;

    return await axios
      .get(Backend.BASE + endpoint, { responseType: "blob" })
      .then((res) => {
        if (res.status === 200) return res.data;
        else return null;
      })
      .catch(() => null);
  }

  public static async getBillList(): Promise<Bill[] | null> {
    const endpoint = `bills`;
    return await axios
      .get(Backend.BASE + endpoint)
      .then((res) => res.data)
      .catch(() => null);
  }

  public static async issueBill(issuerId: string) {
    const endpoint = "bills";
    const data = {
      issuerId,
    };

    // TODO 成否判定
    return await axios
      .post(Backend.BASE + endpoint, data)
      .then(() => true)
      .catch(() => false);
  }
}
