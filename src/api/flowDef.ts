import request, { type ResDataType } from "@/utils/request.ts";
import type { SearchOption } from "./types";

// 获取（查询）流程定义列表
export function getFlowDefListService(
  opt: Partial<SearchOption> = {}
): Promise<ResDataType> {
  return request({
    url: "/flowDef",
    params: opt,
  });
}

// 创建流程定义
export function createFlowDefService(): Promise<ResDataType> {
  return request({
    url: "/flowDef",
    method: "post",
  });
}

// 获取单个流程定义的信息
export function getFlowDefService(id: string): Promise<ResDataType> {
  return request({
    url: `/flowDef/${id}`,
  });
}
