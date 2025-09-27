// src/sections/esim/esim-profile-list.tsx
import type { TableHeadCellProps } from 'src/components/table';

import { useState, useCallback } from 'react';
import { useSetState } from 'minimal-shared/hooks';

import { Card, Table, TableBody } from '@mui/material';

import { paths } from 'src/routes/paths';

import { _userList } from 'src/_mock';
import { useTranslate } from 'src/locales';
import { DashboardContent } from 'src/layouts/dashboard';

import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { useTable, TableNoData, getComparator, TableHeadCustom } from 'src/components/table';

import { CustomerTableRow } from '../customer-table-row';
import { CustomerTableDetailsRow } from '../customer-table-details-row';

// ----------------------------------------------------------------------

export function EsimProfileDetails() {
  const { t } = useTranslate();
  const table = useTable();

  const [tableData, setTableData] = useState<any>(_userList);

  const filters = useSetState<any>({ name: '', role: [], status: 'all' });
  const { state: currentFilters } = filters;

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: currentFilters,
  });

  const notFound = !dataFiltered.length;

  const handleDeleteRow = useCallback(
    (id: string) => {
      const deleteRow = tableData.filter((row: any) => row.id !== id);
      setTableData(deleteRow);
    },
    [tableData]
  );

  const TABLE_HEAD: TableHeadCellProps[] = [
    { id: 'country', label: t('common:table.country') },
    { id: 'number', label: t('common:table.number'), width: 180 },
    { id: 'status', label: t('common:table.status'), width: 100 },
    {id: 'activate', label: t('common:table.activate'), width:100},
    { id: '', width: 88 },
  ];

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading={t('common:list')}
        links={[
          { name: t('common:dashboard'), href: paths.customer.dashboard },
          { name: t('common:list') },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Card>
        <Scrollbar>
          <Table size="medium" sx={{ minWidth: 960 }}>
            <TableHeadCustom
            
              order={table.order}
              orderBy={table.orderBy}
              headCells={TABLE_HEAD}
              rowCount={dataFiltered.length}
              numSelected={table.selected.length}
              onSort={table.onSort}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row: any) => row.id)
                )
              }
            />

            <TableBody>
              {dataFiltered.map((row: any) => (
                <CustomerTableDetailsRow
                  key={row.id}
                  row={row}
                  selected={table.selected.includes(row.id)}
                  onSelectRow={() => table.onSelectRow(row.id)}
                  onDeleteRow={() => handleDeleteRow(row.id)}
                  editHref=""
                  detailsHref={paths.customer.esim.details(row.id)}
                />
              ))}

              <TableNoData notFound={notFound} />
            </TableBody>
          </Table>
        </Scrollbar>
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters }: any) {
  const { name, status, role } = filters;

  const stabilizedThis = inputData.map((el: any, index: any) => [el, index] as const);

  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el: any[]) => el[0]);

  if (name) {
    inputData = inputData.filter((user: { name: string }) =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((user: { status: any }) => user.status === status);
  }

  if (role.length) {
    inputData = inputData.filter((user: { role: any }) => role.includes(user.role));
  }

  return inputData;
}
