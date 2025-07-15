const EmployeeTable = ({ employees = [], columnsConfig = [] }) => {
  return (
    <table>
      <thead>
        <tr>
          {columnsConfig.filter(c => c.visible).map(col => (
            <th key={col.key}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {employees.length > 0 ? (
          employees.map(emp => (
            <tr key={emp.id}>
              {columnsConfig.filter(c => c.visible).map(col => (
                <td key={col.key}>{emp[col.key]}</td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columnsConfig.filter(c => c.visible).length} style={{ textAlign: 'center' }}>
              No employees found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
