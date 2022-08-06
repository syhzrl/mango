import React, { useMemo } from 'react';
import { useTable } from 'react-table';

export interface ReactTableProps {
    tableHeaders: Array<any>,
    tableData: Array<Array<any>>,
    loading?: boolean,
}

const ReactTable = (props: ReactTableProps): JSX.Element => {
    const { tableHeaders, tableData, loading } = props;

    const columns = useMemo(() => tableHeaders?.map((item, index) => ({ Header: item, accessor: index.toString() })), [tableHeaders]);

    const data = useMemo(() => tableData?.map((item) => {
        let rowData: any;

        item.forEach((cell, index) => {
            rowData = {
                ...rowData,
                [index]: cell,
            };
        });

        return rowData;
    }), [tableData]);

    if (!data) return <div style={{ color: 'red' }}>No data found</div>;

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <table {...getTableProps({ style: { width: '100%' } })}>
            <thead>
                {!headerGroups.length || !rows.length ? <div style={{ color: 'red' }}>No data found</div> : headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps()}
                                style={{
                                    padding: '10px 40px',
                                    textAlign: 'center',
                                }}
                            >
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} style={{ borderTop: '1px solid rgb(0,0,0,0.1)' }}>
                            {
                                row.cells.map(cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            style={{
                                                padding: '10px 20px',
                                                textAlign: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })
                            }
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default ReactTable;
