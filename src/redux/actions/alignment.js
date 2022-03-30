import {
  GET_ALIGNMENTS,
  GET_ALIGNMENTS_SUCCESS,
  GET_ALIGNMENTS_FAILED,
  GET_ALIGNMENTS_DETAIL,
  GET_ALIGNMENTS_DETAIL_SUCCESS,
  GET_ALIGNMENTS_DETAIL_FAILED,
  POST_ALIGNMENTS_DETAIL,
  POST_ALIGNMENTS_DETAIL_SUCCESS,
  POST_ALIGNMENTS_DETAIL_FAILED,
  GET_ALIGNMENT_DOWNLOAD,
  GET_ALIGNMENT_DOWNLOAD_SUCCESS,
  GET_ALIGNMENT_DOWNLOAD_FAILED,
  GET_ALIGNMENT_DOWNLOAD_PERMISSION,
  GET_ALIGNMENT_DOWNLOAD_PERMISSION_SUCCESS,
  GET_ALIGNMENT_DOWNLOAD_PERMISSION_FAILED,
} from "../action.type";
import { Success } from "../status-code-type";
import {
  getAlignment,
  getAlignmentDetail,
  postAlignmentDetail,
  getAlignmentDownloadFile,
  getAlignmentDownloadPermission,
} from "../../service/alignment";
import moment from "moment";

export const getAlignmentSession = () => async (dispatch) => {
  dispatch({
    type: GET_ALIGNMENTS,
    loading: true,
    status: null,
    message: null,
    data: [],
  });
  try {
    const payload = await getAlignment();
    if (payload.data.status_code === Success) {
      dispatch({
        type: GET_ALIGNMENTS_SUCCESS,
        loading: false,
        status: payload?.data?.status_code,
        message: payload?.data?.status_description,
        data: payload?.data?.result,
      });
    } else {
      dispatch({
        type: GET_ALIGNMENTS_FAILED,
        loading: false,
        status: payload?.data?.status_code,
        message: payload?.data?.status_description,
        error: payload,
        data: [],
      });
    }
  } catch (error) {
    if (error?.response?.data) {
      dispatch({
        type: GET_ALIGNMENTS_FAILED,
        loading: false,
        status: error?.response?.data?.status,
        message: error?.response?.data?.error || "Something wrong",
        error,
        data: [],
      });
    } else {
      dispatch({
        type: GET_ALIGNMENTS_FAILED,
        loading: false,
        status: null,
        message: "Something wrong",
        error,
        data: [],
      });
    }
  }
};

export const getAlignmentSessionDetail = (sessionId) => async (dispatch) => {
  dispatch({
    type: GET_ALIGNMENTS_DETAIL,
    loadingDetail: true,
    statusDetail: null,
    messageDetail: null,
    dataDetail: [],
  });
  try {
    // if (sessionId === "521" || sessionId === 521) {
    //   const payload = {
    //     data: {
    //       result: {
    //         needImprovementPercentage: 30,
    //         outstandingPercentage: 20,
    //         totalActualNeedImprovement: 1,
    //         totalActualOutstanding: 3,
    //         totalActualWellDone: 2,
    //         totalRequirementNeedImprovement: 2,
    //         totalRequirementOutstanding: 1,
    //         totalRequirementWellDone: 3,
    //         userRole: {
    //           isFacilitator: true,
    //           isOwner: false,
    //           isParticipant: false,
    //         },
    //         usersCalibration: [
    //           {
    //             department: "N/A",
    //             directorate: "Human Capital",
    //             firstName: "Aztia Pertiwi",
    //             formDataId: 8055,
    //             formTitle:
    //               "Performance Planning and Review - 2nd Semester 2020 for Aztia Pertiwi Damukuto",
    //             individualPerformanceDetailExternalCode: "64452",
    //             kpiAchievementScore: "Not yet scored",
    //             lastName: "Damukuto",
    //             managerFirstName: "Yan Ferdiyan Nurfurqan",
    //             managerId: "90006460",
    //             managerLastName: ".",
    //             managerName: "Yan Ferdiyan Nurfurqan .",
    //             name: "Aztia Pertiwi Damukuto",
    //             number: 1,
    //             postAlignment: 1,
    //             postAlignmentNumeric: 1,
    //             postRanking: 0,
    //             preAlignment: "Well Done",
    //             preAlignmentNumeric: 2,
    //             ranking: " ",
    //             userId: "90005684",
    //           },
    //           {
    //             department: "N/A",
    //             directorate: "Finance",
    //             firstName: "Agus",
    //             formDataId: 8044,
    //             formTitle:
    //               "Performance Planning and Review - 2nd Semester 2020 for Agus Ruswanto",
    //             individualPerformanceDetailExternalCode: "64453",
    //             kpiAchievementScore: "Not yet scored",
    //             lastName: "Ruswanto",
    //             managerFirstName: "Linda",
    //             managerId: "90002676",
    //             managerLastName: "Susanty",
    //             managerName: "Linda Susanty",
    //             name: "Agus Ruswanto",
    //             number: 2,
    //             postAlignment: 3,
    //             postAlignmentNumeric: 3,
    //             postRanking: 2,
    //             preAlignment: "Outstanding",
    //             preAlignmentNumeric: 3,
    //             ranking: 2,
    //             userId: "90000536",
    //           },
    //           {
    //             department: "N/A",
    //             directorate: "CEO's Office",
    //             firstName: "Anwar",
    //             formDataId: 8052,
    //             formTitle:
    //               "Performance Planning and Review - 2nd Semester 2020 for Anwar Mustofa",
    //             individualPerformanceDetailExternalCode: "64454",
    //             kpiAchievementScore: "Not yet scored",
    //             lastName: "Mustofa",
    //             managerFirstName: "Marwan Oemar",
    //             managerId: "90000400",
    //             managerLastName: "Basir",
    //             managerName: "Marwan Oemar Basir",
    //             name: "Anwar Mustofa",
    //             number: 3,
    //             postAlignment: 3,
    //             postAlignmentNumeric: 3,
    //             postRanking: 1,
    //             preAlignment: "Well Done",
    //             preAlignmentNumeric: 2,
    //             ranking: 1,
    //             userId: "90002342",
    //           },
    //           {
    //             department: "N/A",
    //             directorate: "Finance",
    //             firstName: "Ade",
    //             formDataId: 8038,
    //             formTitle:
    //               "Performance Planning and Review - 2nd Semester 2020 for Ade Erwin",
    //             individualPerformanceDetailExternalCode: "64455",
    //             kpiAchievementScore: "Not yet scored",
    //             lastName: "Erwin",
    //             managerFirstName: "Indar Singh",
    //             managerId: "90006658",
    //             managerLastName: "Dhaliwal",
    //             managerName: "Indar Singh Dhaliwal",
    //             name: "Ade Erwin",
    //             number: 4,
    //             postAlignment: 2,
    //             postAlignmentNumeric: 2,
    //             postRanking: 1,
    //             preAlignment: "Outstanding",
    //             preAlignmentNumeric: 3,
    //             ranking: 1,
    //             userId: "90004278",
    //           },
    //           {
    //             department: "N/A",
    //             directorate: " ",
    //             firstName: "Brooke",
    //             formDataId: 8918,
    //             formTitle:
    //               "Performance Planning and Review - 2nd Semester 2020 for Brooke Brown",
    //             individualPerformanceDetailExternalCode: "64456",
    //             kpiAchievementScore: "Not yet scored",
    //             lastName: "Brown",
    //             managerFirstName: "Alex",
    //             managerId: "aaaa",
    //             managerLastName: "Anderson",
    //             managerName: "Alex Anderson",
    //             name: "Brooke Brown",
    //             number: 5,
    //             postAlignment: 3,
    //             postAlignmentNumeric: 3,
    //             postRanking: 3,
    //             preAlignment: "Well Done",
    //             preAlignmentNumeric: 2,
    //             ranking: 3,
    //             userId: "bbbb",
    //           },
    //           {
    //             department: "N/A",
    //             directorate: "CEO's Office",
    //             firstName: "Andy Satrio",
    //             formDataId: 8050,
    //             formTitle:
    //               "Performance Planning and Review - 2nd Semester 2020 for Andy Satrio Yuddho",
    //             individualPerformanceDetailExternalCode: "64457",
    //             kpiAchievementScore: "Not yet scored",
    //             lastName: "Yuddho",
    //             managerFirstName: "Tri Wahyuningsih",
    //             managerId: "90002807",
    //             managerLastName: ".",
    //             managerName: "Tri Wahyuningsih .",
    //             name: "Andy Satrio Yuddho",
    //             number: 6,
    //             postAlignment: 2,
    //             postAlignmentNumeric: 2,
    //             postRanking: 2,
    //             preAlignment: "Outstanding",
    //             preAlignmentNumeric: 3,
    //             ranking: 2,
    //             userId: "90007605",
    //           },
    //           {
    //             department: "N/A",
    //             directorate: "CEO's Office",
    //             firstName: "Satrio Andy",
    //             formDataId: 8051,
    //             formTitle:
    //               "Performance Planning and Review - 2nd Semester 2020 for Andy Satrio Yuddho",
    //             individualPerformanceDetailExternalCode: "64457",
    //             kpiAchievementScore: "Not yet scored",
    //             lastName: "Yuddho",
    //             managerFirstName: "Tri Wahyuningsih",
    //             managerId: "90002807",
    //             managerLastName: ".",
    //             managerName: "Tri Wahyuningsih .",
    //             name: "Satrio Andy Yuddho",
    //             number: 7,
    //             postAlignment: 3,
    //             postAlignmentNumeric: 3,
    //             postRanking: 4,
    //             preAlignment: "Outstanding",
    //             preAlignmentNumeric: 3,
    //             ranking: 4,
    //             userId: "90007605",
    //           },
    //           {
    //             department: "N/A",
    //             directorate: "CEO's Office",
    //             firstName: "Satrio Andy",
    //             formDataId: 8154,
    //             formTitle:
    //               "Performance Planning and Review - 2nd Semester 2020 for Andy Satrio Yuddho",
    //             individualPerformanceDetailExternalCode: "64457",
    //             kpiAchievementScore: "Not yet scored",
    //             lastName: "Yuddho",
    //             managerFirstName: "Tri Wahyuningsih",
    //             managerId: "90002807",
    //             managerLastName: ".",
    //             managerName: "Tri Wahyuningsih .",
    //             name: "Satrio Andy Yuddho",
    //             number: 8,
    //             postAlignment: 3,
    //             postAlignmentNumeric: 3,
    //             postRanking: 5,
    //             preAlignment: "Outstanding",
    //             preAlignmentNumeric: 3,
    //             ranking: 5,
    //             userId: "90007605",
    //           },
    //         ],
    //         wellDonePercentage: 50,
    //       },
    //       status_code: 0,
    //       status_description: "Success",
    //     },
    //   };
    const payload = await getAlignmentDetail(sessionId);
    if (payload.data.status_code === Success) {
      console.log(payload);
      dispatch({
        type: GET_ALIGNMENTS_DETAIL_SUCCESS,
        loadingDetail: false,
        statusDetail: payload?.data?.status_code,
        messageDetail: payload?.data?.status_description,
        dataDetail: payload?.data?.result,
      });
    } else {
      dispatch({
        type: GET_ALIGNMENTS_DETAIL_FAILED,
        loadingDetail: false,
        statusDetail: payload?.data?.status_code,
        messageDetail: payload?.data?.status_description,
        errorDetail: payload,
        dataDetail: [],
      });
    }
    // } else {
    //   const payload = await getAlignmentDetail(sessionId);
    //   if (payload.data.status_code === Success) {
    //     console.log(payload);
    //     dispatch({
    //       type: GET_ALIGNMENTS_DETAIL_SUCCESS,
    //       loadingDetail: false,
    //       statusDetail: payload?.data?.status_code,
    //       messageDetail: payload?.data?.status_description,
    //       dataDetail: payload?.data?.result,
    //     });
    //   } else {
    //     dispatch({
    //       type: GET_ALIGNMENTS_DETAIL_FAILED,
    //       loadingDetail: false,
    //       statusDetail: payload?.data?.status_code,
    //       messageDetail: payload?.data?.status_description,
    //       errorDetail: payload,
    //       dataDetail: [],
    //     });
    //   }
    // }
  } catch (error) {
    if (error?.response?.data) {
      dispatch({
        type: GET_ALIGNMENTS_DETAIL_FAILED,
        loadingDetail: false,
        statusDetail: error?.response?.data?.status,
        messageDetail: error?.response?.data?.error || "Something wrong",
        errorDetail: error,
        dataDetail: [],
      });
    } else {
      dispatch({
        type: GET_ALIGNMENTS_DETAIL_FAILED,
        loadingDetail: false,
        statusDetail: null,
        messageDetail: "Something wrong",
        errorDetail: error,
        dataDetail: [],
      });
    }
  }
};

export const postAlignmentSessionDetail =
  (sessionId, data) => async (dispatch) => {
    dispatch({
      type: POST_ALIGNMENTS_DETAIL,
      loadingPostDetail: true,
      statusPostDetail: null,
      messagePostDetail: null,
      dataPostDetail: [],
    });
    try {
      const payload = await postAlignmentDetail(sessionId, data);
      if (payload.data.status_code === Success) {
        dispatch({
          type: POST_ALIGNMENTS_DETAIL_SUCCESS,
          loadingPostDetail: false,
          statusPostDetail: payload?.data?.status_code,
          messagePostDetail: payload?.data?.status_description,
          dataPostDetail: payload?.data?.result,
        });
      } else {
        dispatch({
          type: POST_ALIGNMENTS_DETAIL_FAILED,
          loadingPostDetail: false,
          statusPostDetail: payload?.data?.status_code,
          messagePostDetail: payload?.data?.status_description,
          errorPostDetail: payload,
          dataPostDetail: [],
        });
      }
    } catch (error) {
      if (error?.response?.data) {
        dispatch({
          type: POST_ALIGNMENTS_DETAIL_FAILED,
          loadingPostDetail: false,
          statusPostDetail: error?.response?.data?.status,
          messagePostDetail: error?.response?.data?.error || "Something wrong",
          errorPostDetail: error,
          dataPostDetail: [],
        });
      } else {
        dispatch({
          type: POST_ALIGNMENTS_DETAIL_FAILED,
          loadingPostDetail: false,
          statusPostDetail: null,
          messagePostDetail: "Something wrong",
          errorPostDetail: error,
          dataPostDetail: [],
        });
      }
    }
  };

export const doGetAlignmentDownload = () => async (dispatch) => {
  dispatch({
    type: GET_ALIGNMENT_DOWNLOAD,
    loadingDownload: true,
    statusDownload: null,
    messageDownload: null,
    dataDownload: {},
  });
  try {
    const timeStamp = moment().format("YYYY-MM-DD_HH-mm-ss");
    const payload = await getAlignmentDownloadFile();
    if (payload?.status === 200) {
      const url = window.URL.createObjectURL(new Blob([payload.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `calibration_data_${timeStamp}.csv`);
      document.body.appendChild(link);
      link.click();
      dispatch({
        type: GET_ALIGNMENT_DOWNLOAD_SUCCESS,
        loadingDownload: false,
        statusDownload: Success,
        messageDownload: "Success",
        dataDownload: {
          data: payload?.data,
          ...payload?.headers,
        },
      });
    } else {
      throw payload;
    }
  } catch (error) {
    if (error?.response) {
      dispatch({
        type: GET_ALIGNMENT_DOWNLOAD_FAILED,
        loadingDownload: false,
        statusDownload: error?.response?.status,
        messageDownload: error?.response?.error || "Something wrong",
        errorDownload: error,
        dataDownload: {},
      });
    } else {
      dispatch({
        type: GET_ALIGNMENT_DOWNLOAD_FAILED,
        loadingDownload: false,
        statusDownload: null,
        messageDownload: "Something wrong",
        errorDownload: error,
        dataDownload: {},
      });
    }
  }
};

export const doGetAlignmentDownloadPermission = () => async (dispatch) => {
  dispatch({
    type: GET_ALIGNMENT_DOWNLOAD_PERMISSION,
    loadingDownloadPermission: true,
    statusDownloadPermission: null,
    messageDownloadPermission: null,
    dataDownloadPermission: {},
  });
  try {
    const payload = await getAlignmentDownloadPermission();
    if (payload.data.status_code === Success) {
      dispatch({
        type: GET_ALIGNMENT_DOWNLOAD_PERMISSION_SUCCESS,
        loadingDownloadPermission: false,
        statusDownloadPermission: payload?.data?.status_code,
        messageDownloadPermission: payload?.data?.status_description,
        dataDownloadPermission: payload?.data?.result,
      });
    } else {
      dispatch({
        type: GET_ALIGNMENT_DOWNLOAD_PERMISSION_FAILED,
        loadingDownloadPermission: false,
        statusDownloadPermission: payload?.data?.status_code,
        messageDownloadPermission: payload?.data?.status_description,
        errorDownloadPermission: payload?.data?.result,
        dataDownloadPermission: {},
      });
    }
  } catch (error) {
    if (error?.response) {
      dispatch({
        type: GET_ALIGNMENT_DOWNLOAD_PERMISSION_FAILED,
        loadingDownload: false,
        statusDownload: error?.response?.status,
        messageDownload: error?.response?.error || "Something wrong",
        errorDownload: error,
        dataDownload: {},
      });
    } else {
      dispatch({
        type: GET_ALIGNMENT_DOWNLOAD_PERMISSION_FAILED,
        loadingDownload: false,
        statusDownload: null,
        messageDownload: "Something wrong",
        errorDownload: error,
        dataDownload: {},
      });
    }
  }
};
