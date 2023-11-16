import React, { useState, useMemo } from 'react'
import { Table, Pagination, Select, Tag, Input, Button, Drawer, Badge  } from 'components/ui'
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import  { matchSorter } from 'match-sorter'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import EditLead from './EditLead'


const columns = [
    {
        Header: 'ID',
        accessor: 'id'
    },
    {
        Header: 'Username',
        accessor: 'username'
    },
    {
        Header: 'Address',
        accessor: 'address'
    },
    {
        Header: 'Authority',
        accessor: 'authority'
    },
    {
        Header: 'Phone No',
        accessor: 'phone_no'
    },
    {
        Header: 'Email',
        accessor: 'email'
    },
    {
        Header: 'Status',
        accessor: 'is_deleted'
    },
    {
        Header: 'Action'
    }
]

const { Tr, Th, Td, THead, TBody, Sorter } = Table


const pageSizeOption = [
	{ value: 10, label: '10 / page'},
	{ value: 20, label: '20 / page'},
	{ value: 30, label: '30 / page'},
	{ value: 40, label: '40 / page'},
	{ value: 50, label: '50 / page'},
]

function FilterInput ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
	const count = preGlobalFilteredRows.length
	const [value, setValue] = useState(globalFilter)
	const onChange = useAsyncDebounce(value => {
		setGlobalFilter(value || undefined)
	}, 200)

	return (
		<div className="flex justify-end">
			<div className="flex items-center mb-4">
				{/* <span className="mr-2">Search:</span> */}
				<Input
					size="sm"
					value={value || ""}
					onChange={e => {
						setValue(e.target.value)
						onChange(e.target.value)
					}}
					style={{maxWidth: 180}}
					placeholder={`Search`}
				/>
			</div>
		</div>
	)
}

function fuzzyTextFilterFn(rows, id, filterValue) {
	return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const LeadsList = props => {

	const { data, dataLength } = props

    const [isOpen, setIsOpen] = useState(false)
    const [editId, setEditId] = useState(); 
    const [editData, setEditData] = useState(); 

	const openDrawer = (data) => {
        // console.log(JSON.parse(data))
        setEditData(JSON.parse(data))
		setIsOpen(true)
	}

	const onDrawerClose = () => {
        setEditId()
		setIsOpen(false)
	}

    const Footer = (
        <div className="text-right w-full">
            <Button size="sm" className="mr-2" onClick={() => onDrawerClose()}>Close</Button>
            <Button size="sm" variant="solid" onClick={() => onDrawerClose()}>Confirm</Button>
        </div>
    )

    const filterTypes = useMemo(() => ({
		// Add a new fuzzyTextFilterFn filter type.
		fuzzyText: fuzzyTextFilterFn,
		// Or, override the default text filter to use
		// "startWith"
		text: (rows, id, filterValue) => {
			return rows.filter(row => {
				const rowValue = row.values[id]
				return rowValue !== undefined ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase()) : true
			})
		},
	}),[])

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		gotoPage,
		setPageSize,
		state: { pageIndex, pageSize },
		rows,
		state,
		preGlobalFilteredRows,
		setGlobalFilter,
			allColumns,
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0 },
			manualPagination: false,
            filterTypes,
		},
        useFilters, 
		useGlobalFilter,
        useSortBy,
		usePagination
        
	)

	const onPaginationChange = page => {
		console.log('page', page)
		gotoPage(page - 1)
	}

	const onSelectChange = value => {
		setPageSize(Number(value))
	}

    const editLead = (e) => {
        openDrawer(e.target.getAttribute('data-details'))
    }

	return (
		<div>
            <FilterInput
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />                
            
			<Table {...getTableProps()}>
				<THead>
					{headerGroups.map(headerGroup => (
						<Tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
                            <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
								{column.render('Header')}
								<span>
									<Sorter sort={column.isSortedDesc}/>
								</span>
							</Th>                               
							))}
						</Tr>
					))}
				</THead>
				<TBody {...getTableBodyProps()}>
					{page.map((row, i) => {
						prepareRow(row)
						return (
							<Tr {...row.getRowProps()}>
								{row.cells.map(cell => {
                                    if(cell.column.id === "authority"){
                                        return <Td {...cell.getCellProps()}> 
										{JSON.parse(cell.value).role.map((item) => {
											let tagClass = "text-white bg-gray-600 border-0 mb-1";
											if(item === "superadmin" || item === "admin"){
												tagClass = "text-white bg-red-800 border-0 mb-1"
											}
											return <><Tag className={tagClass}>{capitalizeFirstLetter(item)}</Tag><br/></>				
										})}
										</Td>
                                    }else if(cell.column.id === "is_deleted"){
                                        return <Td {...cell.getCellProps()}><Tag className={!cell.value? "text-white bg-green-600 border-0" : "text-white bg-red-600 border-0"}> {!cell.value? "Active" : "Suspended"} </Tag> </Td>
                                    }else if(cell.column.Header === "Action"){
                                        return <Td {...cell.getCellProps()}> <Button size="xs"  variant="solid" color="yellow-600" id={cell.row.original.id} data-details={JSON.stringify(cell.row.original)} onClick={editLead}> Edit </Button></Td> 
                                    }else{
                                        return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                                    }									
								})}
							</Tr>
						)
					})}
				</TBody>
			</Table>
            {editData && <Drawer
				title="Profile"
				isOpen={isOpen}
				onClose={onDrawerClose}
				onRequestClose={onDrawerClose}
                // footer={Footer}
			>
                <EditLead data={editData}/>
			</Drawer>}
			<div className="flex items-center justify-between mt-4">
				<Pagination
					pageSize={pageSize}
					currentPage={pageIndex + 1}
					total={dataLength}
					onChange={onPaginationChange}
				/>
				<div style={{minWidth: 130}}>
					<Select
						size="sm"
						isSearchable={false} 
						value={pageSizeOption.filter(option => option.value === pageSize)} 
						options={pageSizeOption}
						onChange={option => onSelectChange(option.value)}
					/>
				</div>
			</div>
		</div>
	)
}

export default LeadsList