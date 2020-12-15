/* eslint-disable react/no-unused-state */
/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/state-in-constructor */
import React from 'react';
import { Form, Input, Icon, Button, Col, Row, Select } from 'antd';

const { Option } = Select;

export default class RelationItem extends React.Component {
  constructor(props) {
    super(props);
    const { relationValue, relationRule } = props;
    const isEdit = !!relationValue.length;
    const keys = this.getEditRelation(isEdit);
    this.state = {
      keys,
      selectRuleList: [],
      relationValue,
      relationRule,
      isEdit,
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  getEditRelation = (isEdit) => {
    const { type, relationValue, relationRule } = this.props;
    let keyList = [{ relationRule: {
      value: undefined,
      help: '',
      validateStatus: '',
    },
    relationValue: {
      value: '',
      help: '',
      validateStatus: '',
    } }];
    if (isEdit) {
      switch (type) {
        case 'single':
          keyList = relationValue.map((v, i) => ({
            relationValue: {
              value: v,
              help: '',
              validateStatus: '',
            },
            relationRule: {
              value: relationRule[i],
              help: '',
              validateStatus: '',
            },
          }));
          break;
        case 'double':
          keyList = relationValue.map((v) => ({
            relationValue: {
              value: v,
              help: '',
              validateStatus: '',
            },
            relationRule: {
              value: undefined,
              help: '',
              validateStatus: '',
            },
          }));
          break;
        default:
          keyList = [{
            relationValue: {
              value: relationValue[0],
              help: '',
              validateStatus: '',
            },
            relationRule: {
              value: relationRule[0],
              help: '',
              validateStatus: '',
            },
          }];
          break;
      }
    }
    return keyList;
  }

  setSelectRuleList = () => {
    const { keys } = this.state;
    const { type, setFatherState } = this.props;
    const select = [];
    for (let i = 0; i < keys.length; i++) {
      if (type !== 'double') {
        if (keys[i].relationRule.value && keys[i].relationValue.value.trim()) {
          select.push(keys[i]);
        }
      } else if (keys[i].relationValue.value.trim()) {
        select.push(keys[i]);
      }
    }
    this.setState({
      selectRuleList: select,
    }, () => {
      const { selectRuleList } = this.state;
      const relationValue = [];
      const relationRule = [];
      for (let i = 0; i < selectRuleList.length; i++) {
        relationValue.push(selectRuleList[i].relationValue.value);
        relationRule.push(selectRuleList[i].relationRule.value);
      }
      this.setState({
        relationValue,
        relationRule,
      });
      setFatherState({
        relationValue,
        relationRule,
      });
    });
  }

  remove = (k, index) => {
    const { keys } = this.state;
    if (keys.length === 1) {
      return;
    }
    this.setState({
      keys: keys.filter((key, i) => i !== index),
    }, () => {
      this.setSelectRuleList();
    });
  };

  add = () => {
    const { keys } = this.state;
    const nextKeys = keys.concat({ relationRule: {
      value: undefined,
      help: '',
      validateStatus: '',
    },
    relationValue: {
      value: '',
      help: '',
      validateStatus: '',
    } });
    this.setState({
      keys: nextKeys,
    });
  };

  checkRequired = () => {
    const { keys } = this.state;
    const { type } = this.props;
    let flag = true;
    for (let i = 0; i < keys.length; i++) {
      const vv = keys[i].relationValue.value.trim();
      const rv = keys[i].relationRule.value;
      if (!vv || (type !== 'double' && !rv)) {
        if (!vv) {
          keys[i].relationValue.validateStatus = 'error';
          keys[i].relationValue.help = '请输入对比值';
        }
        if (!rv && type !== 'double') {
          keys[i].relationRule.validateStatus = 'error';
          keys[i].relationRule.help = '请选择值对比关系';
        }
        flag = false;
      }
    }
    this.setState({ keys });
    return flag;
  }

  changeRuleAndValue = (key, index) => (v) => {
    const { keys } = this.state;
    let _v = v;
    if (key === 'relationValue') {
      _v = _v.target.value;
      if (!_v) {
        keys[index].relationValue.validateStatus = 'error';
        keys[index].relationValue.help = '请输入对比值';
      } else if (!_v.trim()) {
        keys[index].relationValue.validateStatus = 'error';
        keys[index].relationValue.help = '对比值不能为空';
      } else {
        keys[index].relationValue.help = '';
        keys[index].relationValue.validateStatus = '';
      }
      keys[index].relationValue.value = _v;
    }
    if (key === 'relationRule') {
      if (!_v) {
        keys[index].relationRule.validateStatus = 'error';
        keys[index].relationRule.help = '请选择值对比关系';
      } else {
        keys[index].relationRule.validateStatus = '';
        keys[index].relationRule.help = '';
        keys[index].relationRule.value = _v;
      }
    }
    this.setState({ keys }, () => {
      this.setSelectRuleList();
    });
  }

  render() {
    const { type } = this.props;
    const { keys, isEdit } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItems = keys.map((k, index) => (
      <Col span={24} key={index}>
        {type !== 'double' && (
          <Col span={11}>
            <Form.Item
              label="值对比关系"
              required
              help={k.relationRule.help}
              validateStatus={k.relationRule.validateStatus}
              {...formItemLayout}
            >
              <Select
                value={k.relationRule.value}
                onBlur={this.changeRuleAndValue('relationRule', index)}
                onChange={this.changeRuleAndValue('relationRule', index)}
                placeholder="请选择值对比关系"
              >
                <Option value=">">大于</Option>
                <Option value="<">小于</Option>
                <Option value="<=">小于等于</Option>
                <Option value=">=">大于等于</Option>
                <Option value="=">等于</Option>
              </Select>
            </Form.Item>
          </Col>
        )}
        <Col span={11}>
          <Form.Item
            label="对比值"
            required
            help={k.relationValue.help}
            validateStatus={k.relationValue.validateStatus}
            {...formItemLayout}
          >
            <Input
              placeholder="请输入对比值"
              value={k.relationValue.value}
              onBlur={this.changeRuleAndValue('relationValue', index)}
              onChange={this.changeRuleAndValue('relationValue', index)}
            />
          </Form.Item>
        </Col>
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k, index)}
          />
        ) : null}
      </Col>
    ));
    return (
      <Row>
        {
            type === 'grade' || isEdit ? null : (
              <Col span={24}>
                <Form.Item>
                  <Button type="dashed" onClick={this.add}>
                    <Icon type="plus" />
                    {' '}
                    添加值对比关系
                  </Button>
                </Form.Item>
              </Col>
            )
          }
        {formItems}
      </Row>
    );
  }
}
