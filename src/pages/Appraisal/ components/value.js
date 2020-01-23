import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Select, Form, Upload, Button, Icon, Typography, message
} from 'antd';
import DataTable from '../../../components/dataTable';
import {
  doAttachFile, doDeleteFiles
} from '../../../redux/actions/kpi';
import { Success } from '../../../redux/status-code-type';

const { Option } = Select;
const { Text } = Typography;

class Value extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Section',
        dataIndex: 'name'
        // align: 'center'
      },
      {
        title: 'Ratings',
        dataIndex: 'rating',
        align: 'center',
        render: (text, record) => {
          const { optionRating, form } = this.props;
          return (
            <Form>
              <Form.Item style={{ width: '100%' }}>
                {form.getFieldDecorator(`dataKpi[${record.index}].rating`, {
                  rules: [{ required: true, message: 'Rating is required' }],
                  initialValue: record.rating
                })(
                  <Select
                    placeholder="Choose Value"
                    // eslint-disable-next-line react/jsx-no-bind
                    onChange={() => this.change(record, [`dataKpi[${record.index}].rating`])}
                  >
                    {optionRating && optionRating.map((value, index) => {
                      return <Option key={index} value={value.id}>{value.rating}</Option>;
                    })}
                  </Select>
                )}
              </Form.Item>
            </Form>
          );
        }
      },
      {
        title: 'Remarks/Evidence',
        dataIndex: 'comment',
        align: 'center',
        placeholder: 'Enter your Remarks here',
        editable: true
      },
      {
        title: 'Upload',
        dataIndex: 'upload',
        // align: 'center',
        width: 100,
        render: (text, record) => {
          const propsUpload = {
            fileList: record.attachments,
            onChange: this.upload(record),
            transformFile: this.getBase64,
            customRequest: this.uploadFile(record),
            onRemove: this.deleteFile,
            onPreview: this.download,
            onDownload: this.download
          };
          return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Upload {...propsUpload}>
              <Button>
                <Icon type="upload" />
                <Text>Attach files</Text>
              </Button>
            </Upload>
          );
        }
      },
      {
        title: 'Feedback',
        dataIndex: 'feedback',
        placeholder: 'Enter Level 2',
        align: 'center',
        className: 'ant-table-th-yellow'
      }
    ];
  }

  deleteFile = async (file) => {
    const {
      deleteFiles, getOwnValues, userR
    } = this.props;
    const { user } = userR.result;
    await deleteFiles(file.id);
    const {
      kpiR
    } = this.props;
    if (!kpiR.loadingAttach) {
      if (!kpiR.statusAttach === Success) {
        message.warning('Sorry, failed when deleting files');
      }
      getOwnValues(user.userId, true);
    }
  }

  download = async (file) => {
    const linkSource = file.url;
    const downloadLink = document.createElement('a');
    const fileName = file.name;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  uploadFile = (record) => async (options) => {
    const {
      onSuccess, onError, file
    } = options;
    const {
      attachFile, userR, getOwnValues
    } = this.props;
    const { user } = userR.result;
    const fileContent = await file.data;
    const data = {
      id: 0,
      valueId: record.valueId,
      fileName: file.name,
      fileContent
    };
    await attachFile(data);
    const {
      kpiR
    } = this.props;
    if (!kpiR.loadingAttach) {
      if (kpiR.statusAttach === Success) {
        onSuccess(true, file);
        getOwnValues(user.userId, true);
      } else {
        message.warning('Sorry, failed when attaching files');
        onError(false, file);
      }
    }
  };

  upload = (record) => async (attach) => {
    const { handleChangeField } = this.props;
    if (attach.file.status === 'removed') {
      const attachments = [...attach.fileList];
      handleChangeField({
        ...record,
        attachments
      });
    } else {
      // const fileContent = await this.getBase64(attach.file.originFileObj);
      const data = {
        uid: attach.file.uid,
        id: 0,
        valueId: record.valueId,
        name: attach.file.name,
        status: attach.file.status
        // url: fileContent
      };
      const attachments = [...attach.fileList];
      const index = attachments.findIndex((item) => data.uid === item.uid);
      const item = attachments[index];
      attachments.splice(index, 1, {
        ...item,
        ...data
      });
      handleChangeField({
        ...record,
        attachments
      });
    }
  }

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
      file
    };
    return files;
  }

  change = (record, field) => {
    const { handleChangeField, form } = this.props;
    setTimeout(() => form.validateFields(field, (errors, values) => {
      const item = values.dataKpi[record.index];
      handleChangeField({
        ...record,
        ...item
      });
    }), 100);
  };

  render() {
    const { columns } = this;
    const {
      dataSource,
      handleChangeField,
      form,
      loading
    } = this.props;
    return (
      <div>
        <div>
          <DataTable
            form={form}
            columns={columns}
            datasource={dataSource}
            loading={loading}
            handlechange={handleChangeField}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  kpiR: state.kpiReducers,
  userR: state.userReducers
});

const mapDispatchToProps = (dispatch) => ({
  attachFile: (id) => dispatch(doAttachFile(id)),
  deleteFiles: (data) => dispatch(doDeleteFiles(data))
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Value);

export default connectToComponent;

Value.propTypes = {
  dataSource: PropTypes.instanceOf(Array),
  handleChangeField: PropTypes.func,
  attachFile: PropTypes.func,
  deleteFiles: PropTypes.func,
  getOwnValues: PropTypes.func,
  userR: PropTypes.instanceOf(Object),
  kpiR: PropTypes.instanceOf(Object),
  optionRating: PropTypes.instanceOf(Array),
  loading: PropTypes.bool,
  form: PropTypes.instanceOf(Object)
};
