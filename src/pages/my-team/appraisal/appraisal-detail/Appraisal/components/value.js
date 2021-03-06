import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Select, Upload, Modal } from "antd";
import DataTable from "../../../../../../components/dataTable";
import {
  doAttachFile,
  doDeleteFiles,
  getAttachment,
  doDownloadFile,
} from "../../../../../../redux/actions/kpi";
import mimeType from "../../../../../../utils/mimeType";
import {
  Success,
  ATTACHMENT_NOT_FOUND,
} from "../../../../../../redux/status-code-type";
import { toast } from "react-toastify";

const { Option } = Select;
const { confirm } = Modal;

class Value extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      myStepState: null,
    };
  }

  componentDidMount() {
    this.getColumns();
  }

  componentDidUpdate() {
    const { myStepState } = this.state;
    const { myStep } = this.props;
    if (myStepState !== myStep) {
      this.getColumns();
    }
  }

  getColumns = async () => {
    const { myStep } = this.props;
    const newColumns = [
      {
        title: "Section",
        dataIndex: "name",
        width: 200,
        align: "center",
      },
      {
        title: "Ratings",
        dataIndex: "rating",
        width: 100,
        verticalAlign: "top",
        align: "center",
        render: (text, record) => {
          const { optionRating } = this.props;
          return (
            <Select
              value={record.rating}
              placeholder="Choose Value"
              disabled
              style={{ width: "100%" }}
            >
              {optionRating &&
                optionRating.map((value, index) => {
                  return (
                    <Option key={index} value={value.id}>
                      {value.rating}
                    </Option>
                  );
                })}
            </Select>
          );
        },
      },
      {
        title: "Remarks/Evidence",
        dataIndex: "comment",
        isManager: true,
        width: 200,
        placeholder: "Enter your Remarks here",
        align: "center",
        editable: false,
      },
      {
        title: "Upload",
        dataIndex: "upload",
        align: "center",
        verticalAlign: "top",
        width: 100,
        render: (text, record) => {
          const propsUpload = {
            fileList: record.attachments,
            onChange: this.upload(record),
            transformFile: this.getBase64,
            customRequest: this.uploadFile(record),
            onRemove: this.deleteFile,
            onPreview: this.download,
            onDownload: this.download,
            showUploadList: {
              showDownloadIcon: true,
              showRemoveIcon: false,
            },
            // eslint-disable-next-line react/destructuring-assignment
            disabled: true,
            accept:
              ".doc,.docx,.pdf,.mle,.ppt,.pptx,.xlsx,.gif,.png,.jpg,.jpeg,.html,.rtf,.bmp,.txt,.csv,.htm",
          };
          return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Upload {...propsUpload} />
          );
        },
      },
      {
        title: "Feedback",
        dataIndex: "feedback",
        placeholder: "Enter Value Feedback",
        align: "center",
        editable: myStep,
        width: 100,
        className: "ant-table-th-yellow",
      },
    ];
    this.setState({
      columns: newColumns,
      myStepState: myStep,
    });
  };

  deleteFile = async (file) => {
    const {
      deleteFiles,
      // getOwnValues, userR
    } = this.props;
    // const { user } = userR.result;
    return new Promise((resolve, reject) => {
      if (file.status === "done") {
        confirm({
          title: "Are you sure?",
          content: `Do you really want to delete "${file.name}" ?`,
          okText: "Delete",
          cancelText: "Cancel",
          onOk: async () => {
            await deleteFiles(file.id);
            const { kpiR } = this.props;
            if (!kpiR.loadingDeleteFile) {
              //sundus change
              if (
                kpiR.statusDeleteFile === Success ||
                kpiR.statusDeleteFile === ATTACHMENT_NOT_FOUND
              ) {
                toast.success(`"${file.name}" has been deleted`);
                // getOwnValues(user.userId, true);
                resolve(true);
              } else {
                toast.warn(`Sorry, ${kpiR.messageDeleteFile}`);
              }
            }
          },
          onCancel() {},
        });
      } else {
        resolve(true);
      }
    });
  };

  download = async (file) => {
    const { doDownload } = this.props;
    const mimeProp = Object.keys(mimeType);
    let mediaType = "";
    mimeProp.map((item, index) => {
      if (file.name.includes(item)) {
        mediaType = mimeType[item];
      }
      return mediaType;
    });
    await doDownload(file.id);
    const { loadingDownload, statusDownload, messageDownload, dataDownload } =
      this.props.kpiR;
    if (!loadingDownload) {
      if (statusDownload === Success) {
        const linkSource = `data:${mediaType};base64,${dataDownload.fileContent}`;
        const downloadLink = document.createElement("a");
        const fileName = file.name;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      } else {
        toast.warn(`Sorry, ${messageDownload}`);
      }
    }
  };

  uploadFile = (record) => async (options) => {
    const { onSuccess, onError, file } = options;
    const { attachFile, authReducer, getOwnValues } = this.props;
    const fileContent = await file.data;
    const b64 = fileContent.replace(/^data:.+;base64,/, "");
    const data = {
      id: 0,
      valueId: record.valueId,
      fileName: file.name,
      fileContent: b64,
    };
    if (file.file.size > 5242880) {
      toast.warn("Sorry, Maximum file is 5MB");
      onError(false, file);
    } else {
      await attachFile(data);
      const { kpiR } = this.props;
      if (!kpiR.loadingAttach) {
        if (kpiR.statusAttach === Success) {
          onSuccess(true, file);
          getOwnValues(authReducer?.userId, true);
          toast.success(`"${file.name}" has been uploaded`);
        } else {
          toast.warn(`Sorry, ${kpiR.messageAttach}`);
          onError(false, file);
        }
      }
    }
  };

  upload = (record) => async (attach) => {
    const { handleChangeField } = this.props;
    if (attach.file.status === "removed") {
      const attachments = [...attach.fileList];
      handleChangeField({
        ...record,
        attachments,
      });
    } else {
      // const fileContent = await this.getBase64(attach.file.originFileObj);
      const data = {
        uid: attach.file.uid,
        id: 0,
        valueId: record.valueId,
        name: attach.file.name,
        status: attach.file.status,
        // url: fileContent
      };
      const attachments = [...attach.fileList];
      const index = attachments.findIndex((item) => data.uid === item.uid);
      const item = attachments[index];
      attachments.splice(index, 1, {
        ...item,
        ...data,
      });
      handleChangeField({
        ...record,
        attachments,
      });
    }
  };

  getBase64 = (file) => {
    const data = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
    const files = {
      name: file.name,
      data,
      file,
    };
    return files;
  };

  change = (record, field) => {
    const { handleChangeField, form } = this.props;
    setTimeout(
      () =>
        form.validateFields(field, (errors, values) => {
          const item = values.dataGeneral[record.index];
          handleChangeField({
            ...record,
            ...item,
          });
        }),
      100
    );
  };

  render() {
    const { columns } = this.state;
    const { dataSource, handleChangeField, form, loading } = this.props;
    return (
      <div>
        <div>
          <DataTable
            form={form}
            columns={columns}
            loading={loading}
            handlechange={handleChangeField}
            datasource={dataSource}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  kpiR: state.kpiReducer,
  authReducer: state.authReducer,
});

const mapDispatchToProps = (dispatch) => ({
  attachFile: (id) => dispatch(doAttachFile(id)),
  doGetAttachment: (valueId) => dispatch(getAttachment(valueId)),
  deleteFiles: (data) => dispatch(doDeleteFiles(data)),
  doDownload: (attachId) => dispatch(doDownloadFile(attachId)),
});

const connectToComponent = connect(mapStateToProps, mapDispatchToProps)(Value);

export default connectToComponent;

Value.propTypes = {
  dataSource: PropTypes.instanceOf(Array),
  handleChangeField: PropTypes.func,
  attachFile: PropTypes.func,
  deleteFiles: PropTypes.func,
  getOwnValues: PropTypes.func,
  handleSave: PropTypes.func,
  goToMonitoring: PropTypes.func,
  handleSubmit: PropTypes.func,
  userR: PropTypes.instanceOf(Object),
  kpiR: PropTypes.instanceOf(Object),
  optionRating: PropTypes.instanceOf(Array),
  loading: PropTypes.bool,
  myStep: PropTypes.bool,
  form: PropTypes.instanceOf(Object),
};
