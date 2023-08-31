import request, { type ResDataType } from "@/utils/request.ts";
import type { SearchOption } from "./types";

// 获取（查询）问卷列表
export function getQuestionListService(
  opt: Partial<SearchOption> = {}
): Promise<ResDataType> {
  return request({
    url: "/question",
    params: opt,
  });
}

// 创建问卷
export function createQuestionService(): Promise<ResDataType> {
  return request({
    url: "/question",
    method: "post",
  });
}
