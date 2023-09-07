import { IApiResponseIssueItem } from "./ApiResponseIssueItem.interface";

/**
 * @name IApiResponseWithIssues
 * @description
 */

export interface IApiResponseWithIssues {
  issues?: IApiResponseIssueItem[];
}
