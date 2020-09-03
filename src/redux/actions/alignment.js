import { GET_ALIGNMENTS, GET_ALIGNMENTS_SUCCESS, GET_ALIGNMENTS_FAILED, GET_ALIGNMENTS_DETAIL, GET_ALIGNMENTS_DETAIL_SUCCESS, GET_ALIGNMENTS_DETAIL_FAILED, POST_ALIGNMENTS_DETAIL, POST_ALIGNMENTS_DETAIL_SUCCESS, POST_ALIGNMENTS_DETAIL_FAILED, GET_ALIGNMENT_DOWNLOAD, GET_ALIGNMENT_DOWNLOAD_SUCCESS, GET_ALIGNMENT_DOWNLOAD_FAILED, GET_ALIGNMENT_DOWNLOAD_PERMISSION, GET_ALIGNMENT_DOWNLOAD_PERMISSION_SUCCESS, GET_ALIGNMENT_DOWNLOAD_PERMISSION_FAILED } from "../action.type";
import { Success } from "../status-code-type";
import { getAlignment, getAlignmentDetail, postAlignmentDetail, getAlignmentDownloadFile, getAlignmentDownloadPermission } from "../../service/alignment";

export const getAlignmentSession = () => async (dispatch) => {
    dispatch({
      type: GET_ALIGNMENTS,
      loading: true,
      status: null,
      message: null,
      data: []
    });
    try {
      const payload = await getAlignment();
      if (payload.data.status_code === Success) {
        dispatch({
          type: GET_ALIGNMENTS_SUCCESS,
          loading: false,
          status: payload?.data?.status_code,
          message: payload?.data?.status_description,
          data: payload?.data?.result
        });
      } else {
        dispatch({
          type: GET_ALIGNMENTS_FAILED,
          loading: false,
          status: payload?.data?.status_code,
          message: payload?.data?.status_description,
          error: payload,
          data: []
        });
      }
    } catch (error) {
      if (error?.response?.data) {
        dispatch({
          type: GET_ALIGNMENTS_FAILED,
          loading: false,
          status: error?.response?.data?.status,
          message: error?.response?.data?.error || 'Something wrong',
          error,
          data: []
        });
      } else {
        dispatch({
          type: GET_ALIGNMENTS_FAILED,
          loading: false,
          status: null,
          message: 'Something wrong',
          error,
          data: []
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
      dataDetail: []
    });
    try {
      const payload = await getAlignmentDetail(sessionId);
      if (payload.data.status_code === Success) {
        dispatch({
          type: GET_ALIGNMENTS_DETAIL_SUCCESS,
          loadingDetail: false,
          statusDetail: payload?.data?.status_code,
          messageDetail: payload?.data?.status_description,
          dataDetail: payload?.data?.result
        });
      } else {
        dispatch({
          type: GET_ALIGNMENTS_DETAIL_FAILED,
          loadingDetail: false,
          statusDetail: payload?.data?.status_code,
          messageDetail: payload?.data?.status_description,
          errorDetail: payload,
          dataDetail: []
        });
      }
    } catch (error) {
      if (error?.response?.data) {
        dispatch({
          type: GET_ALIGNMENTS_DETAIL_FAILED,
          loadingDetail: false,
          statusDetail: error?.response?.data?.status,
          messageDetail: error?.response?.data?.error || 'Something wrong',
          errorDetail: error,
          dataDetail: []
        });
      } else {
        dispatch({
          type: GET_ALIGNMENTS_DETAIL_FAILED,
          loadingDetail: false,
          statusDetail: null,
          messageDetail: 'Something wrong',
          errorDetail: error,
          dataDetail: []
        });
      }
    }
  };
  
export const postAlignmentSessionDetail = (sessionId, data) => async (dispatch) => {
  dispatch({
    type: POST_ALIGNMENTS_DETAIL,
    loadingPostDetail: true,
    statusPostDetail: null,
    messagePostDetail: null,
    dataPostDetail: []
  });
  try {
    const payload = await postAlignmentDetail(sessionId, data);
    if (payload.data.status_code === Success) {
      dispatch({
        type: POST_ALIGNMENTS_DETAIL_SUCCESS,
        loadingPostDetail: false,
        statusPostDetail: payload?.data?.status_code,
        messagePostDetail: payload?.data?.status_description,
        dataPostDetail: payload?.data?.result
      });
    } else {
      dispatch({
        type: POST_ALIGNMENTS_DETAIL_FAILED,
        loadingPostDetail: false,
        statusPostDetail: payload?.data?.status_code,
        messagePostDetail: payload?.data?.status_description,
        errorPostDetail: payload,
        dataPostDetail: []
      });
    }
  } catch (error) {
    if (error?.response?.data) {
      dispatch({
        type: POST_ALIGNMENTS_DETAIL_FAILED,
        loadingPostDetail: false,
        statusPostDetail: error?.response?.data?.status,
        messagePostDetail: error?.response?.data?.error || 'Something wrong',
        errorPostDetail: error,
        dataPostDetail: []
      });
    } else {
      dispatch({
        type: POST_ALIGNMENTS_DETAIL_FAILED,
        loadingPostDetail: false,
        statusPostDetail: null,
        messagePostDetail: 'Something wrong',
        errorPostDetail: error,
        dataPostDetail: []
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
    dataDownload: {}
  });
  try {
    const payload = await getAlignmentDownloadFile()
    if (payload?.status === 200) {
      const url = window.URL.createObjectURL(new Blob([payload.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `calibration_data_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
    dispatch({
      type: GET_ALIGNMENT_DOWNLOAD_SUCCESS,
      loadingDownload: false,
      statusDownload: Success,
      messageDownload: 'Success',
      dataDownload: {
        data: payload?.data,
        ...payload?.headers
      }
    });
    } else {
      throw payload
    }
  } catch (error) {
    if (error?.response) {
      dispatch({
        type: GET_ALIGNMENT_DOWNLOAD_FAILED,
        loadingDownload: false,
        statusDownload: error?.response?.status,
        messageDownload: error?.response?.error || 'Something wrong',
        errorDownload: error,
        dataDownload: {}
      });
    } else {
      dispatch({
        type: GET_ALIGNMENT_DOWNLOAD_FAILED,
        loadingDownload: false,
        statusDownload: null,
        messageDownload: 'Something wrong',
        errorDownload: error,
        dataDownload: {}
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
    dataDownloadPermission: {}
  });
  try {
    const payload = await getAlignmentDownloadPermission()
    if (payload.data.status_code === Success) {
      dispatch({
        type: GET_ALIGNMENT_DOWNLOAD_PERMISSION_SUCCESS,
        loadingDownloadPermission: false,
        statusDownloadPermission: payload?.data?.status_code,
        messageDownloadPermission: payload?.data?.status_description,
        dataDownloadPermission: payload?.data?.result
      });
    } else {
      dispatch({
        type: GET_ALIGNMENT_DOWNLOAD_PERMISSION_FAILED,
        loadingDownloadPermission: false,
        statusDownloadPermission: payload?.data?.status_code,
        messageDownloadPermission: payload?.data?.status_description,
        errorDownloadPermission: payload?.data?.result,
        dataDownloadPermission: {}
      });
    }
  } catch (error) {
    if (error?.response) {
      dispatch({
        type: GET_ALIGNMENT_DOWNLOAD_PERMISSION_FAILED,
        loadingDownload: false,
        statusDownload: error?.response?.status,
        messageDownload: error?.response?.error || 'Something wrong',
        errorDownload: error,
        dataDownload: {}
      });
    } else {
      dispatch({
        type: GET_ALIGNMENT_DOWNLOAD_PERMISSION_FAILED,
        loadingDownload: false,
        statusDownload: null,
        messageDownload: 'Something wrong',
        errorDownload: error,
        dataDownload: {}
      });
    }
  }
};
