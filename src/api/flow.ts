import request, { type ResDataType } from "@/utils/request.ts";
import type { SearchOption } from "./types";

// 获取（查询）问卷列表
export function getFlowListService(
  opt: Partial<SearchOption> = {}
): Promise<ResDataType> {
  return request({
    url: "/flow",
    params: opt,
  });
}

// 创建问卷
export function createFlowService(): Promise<ResDataType> {
  return request({
    url: "/flow",
    method: "post",
  });
}
