'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Modal, Table, TableProps, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import snakeCase from 'lodash.snakecase';
import { DeleteOutlined } from '@ant-design/icons';

export type CustomTableProps = {
  title?: string;
  items: Record<'data' | 'kids' | string, Record<string, any>>[];
  tableProps?: TableProps<any>;
}

export const CustomTable: React.FC<CustomTableProps> = ({ items, ...props }) => {

  /**
   * columns
   */

  const handlerOnDelete = (key: string) => {
    Modal.confirm({
      title: 'Delete?',
      okType: 'danger',
      okText: 'Delete',
      onOk: () => {
        setData(prevState => prevState.filter(item => item.key !== key));
      }
    });
  };

  const columns = useMemo<ColumnsType<Record<string, string>>>(() => {
    const _firstItem = items?.[0];
    const _columns: ColumnsType<any> = _firstItem?.data ? Object.keys(_firstItem.data).map((key) => {
      const _normKey = snakeCase(key);
      return ({
        key: _normKey,
        dataIndex: _normKey,
        title: key
      });
    }) : [];

    _columns.push({
      key: 'action',
      render: (_, { key }) => (
        <Button
          danger={true}
          icon={<DeleteOutlined/>}
          onClick={() => handlerOnDelete(key)}
        >
          Delete
        </Button>
      )
    });

    return _columns;
  }, [items]);

  /**
   * data
   */

  const [data, setData] = useState<Record<string, string>[]>([]);

  useEffect(() => {
    const _data = items.map((item, index) => {
      const _result: Record<string, string> = { key: index.toString() };
      Object.entries(item.data).forEach(([key, value]) => {
        _result[snakeCase(key)] = value;
      });
      return _result;
    });

    setData(_data);
  }, [items]);

  /**
   * expanded
   */

  const expandedRowRender = (_: any, index: number) => Object.entries(items[index].kids).map(
    ([key, value]) => (
      <CustomTable
        key={`${key}-${index}`}
        title={key}
        items={value.records as CustomTableProps['items']}
        tableProps={{ pagination: false }}
      />
    )
  );

  const rowExpandable = (record: { key: number }) => {
    const _kids = items[record.key]?.kids;
    return _kids && Boolean(Object.keys(_kids).length);
  };

  /**
   * render
   */

  const { token } = theme.useToken();

  return (
    <Table
      style={{ padding: token.padding }}
      title={props.title ? () => props.title : undefined}
      columns={columns}
      dataSource={data}
      expandable={{ expandedRowRender, rowExpandable }}
      {...props.tableProps}
    />
  );
};
