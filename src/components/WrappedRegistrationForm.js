import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const grades = [{
  value: '15级',
  label: '15级'
}, {
  value: '16级',
  label: '16级'
},{
  value: '17级',
  label: '17级'
}];

const colleges=[{
  value: '电子商务学院',
  label: '电子商务学院'
}, {
  value: '建筑工程学院',
  label: '建筑工程学院'
},{
  value: '现代模具学院',
  label: '现代模具学院'
},{
  value: '经管学院',
  label: '经管学院'
},{
  value: '数字传媒学院',
  label: '数字传媒学院'
},{
  value: '智能电子与汽车服务学院',
  label: '智能电子与汽车服务学院'
},{
  value: '国际交流学院',
  label: '国际交流学院'
},{
  value: '明智学院',
  label: '明智学院'
},{
  value: '慈溪学院',
  label: '慈溪学院'
}];

const gongyus = [{
  value:"1号楼",
  label:"1号楼"
},{
  value:"2号楼",
  label:"2号楼"
},{
  value:"3号楼",
  label:"3号楼"
},{
  value:"4号楼",
  label:"4号楼"
},{
  value:"5号楼",
  label:"5号楼"
},{
  value:"6号楼",
  label:"6号楼"
},{
  value:"7号楼",
  label:"7号楼"
},{
  value:"8号楼",
  label:"8号楼"
},{
  value:"9号楼",
  label:"9号楼"
},{
  value:"10号楼",
  label:"10号楼"
},{
  value:"11号楼",
  label:"11号楼"
},{
  value:"12号楼",
  label:"12号楼"
},{
  value:"A号楼",
  label:"A号楼"
},{
  value:"B号楼",
  label:"B号楼"
},{
  value:"宁海校区女生楼",
  label:"宁海校区女生楼"
},{
  value:"宁海校区男生楼",
  label:"宁海校区男生楼"
},{
  value:"慈溪校区",
  label:"慈溪校区"
}]
class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 60 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form onSubmit={this.handleSubmit}>
        
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              姓名&nbsp;
              <Tooltip title="请输入真实姓名">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('youname', {
            rules: [{ required: true, message: '请输入你的姓名', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="年级"
        >
          {getFieldDecorator('grade', {
            rules: [{ type: 'array', required: true, message: '请选择年级' }],
          })(
            <Cascader options={grades} />
          )}
        </FormItem>
        <FormItem
        {...formItemLayout}
        label="班级"
        >
        {getFieldDecorator('class', {
          rules: [{ required: true, message: '请输入你的班级', whitespace: true }],
        })(
          <Input />
        )}
        </FormItem>
        <FormItem
        {...formItemLayout}
        label="学号"
        >
        {getFieldDecorator('studentId', {
          rules: [{ required: true, message: '请输入你的学号', whitespace: true }],
        })(
          <Input />
        )}
        </FormItem>
        <FormItem
        {...formItemLayout}
        label="学院"
        >
        {getFieldDecorator('college', {
          rules: [{ type: 'array', required: true, message: '请选择学院' }],
        })(
          <Cascader options={colleges} />
        )}
        </FormItem>
        <FormItem
        {...formItemLayout}
        label="专业"
        >
        {getFieldDecorator('majors', {
          rules: [{ required: true, message: '请输入你的专业', whitespace: true }],
        })(
          <Input />
        )}
        </FormItem>
        <FormItem
        {...formItemLayout}
        label="公寓楼"
        >
        {getFieldDecorator('gongyu', {
          rules: [{ type: 'array', required: true, message: '请选择公寓楼' }],
        })(
          <Cascader options={gongyus} />
        )}
        </FormItem>
        <FormItem
        {...formItemLayout}
        label="寝室号"
        >
        {getFieldDecorator('DormitoryId', {
          rules: [{ required: true, message: '请输入你的寝室号', whitespace: true }],
        })(
          <Input />
        )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">提交</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default WrappedRegistrationForm;
