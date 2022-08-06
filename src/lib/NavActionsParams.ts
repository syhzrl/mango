export interface NavToQrScreenParams {
    campaignName: string;
    campaignId: string;
}

export interface NavToEditQrParams {
    qrId: string;
}

export interface NavToQrDetailsParams {
    qrId: string;
    qrName: string;
    campaignId: string;
}

export interface NavToSurveyReportsParams {
    surveyId: string;
    surveyName: string;
}

export interface NavToSurveyResponsesParams {
    surveyId: string;
    surveyName: string;
}
