import DepartmentForm from "@/components/department/DepartmentForm";
import PageHeader from "@/components/PageHeader";
import { useAuth } from "@/context/AuthContext";
import { useIds } from "@/context/IdsContext";
import { useModal } from "@/context/ModalContext";
import { useAllDepartments } from "@/hooks/manager/department/useAllDepartments";
import { useCreateDepartment } from "@/hooks/manager/department/useCreateDepartment";
import { useEditDepartment } from "@/hooks/manager/department/useEditDepartment";
import {
  DepartmentsColumns,
  DepartmentsManagerColumns,
  DepartmentsTableColumns,
} from "@/utils/tableUtils/columns";
import { DataTable } from "@/utils/tableUtils/dataTable";
import { MutateDepartmentDataType } from "@/utils/types";
import { SubmitHandler, useForm } from "react-hook-form";

function DepartmentsPage() {
  const { user } = useAuth();
  const { allDepartments } = useAllDepartments();
  const { openModal, closeModal, activeModal } = useModal();
  const { selectedId } = useIds();
  const methods = useForm<MutateDepartmentDataType>();
  const { createDepartment } = useCreateDepartment();
  const { updateDepartment } = useEditDepartment();

  const departments = allDepartments?.map((department) => {
    return {
      id: department.id,
      name: department.name,
      managerId: department.manager.id,
      managerName: department.manager.name,
      employees: department.employees.length,
    } as DepartmentsTableColumns;
  });

  function handleAddDepartment(): void {
    openModal("create");
  }

  const onSubmit: SubmitHandler<MutateDepartmentDataType> = (data) => {
    const manager_id = Number(data.manager_id);
    if (activeModal === "create") {
      createDepartment({ ...data, manager_id });
    } else if (activeModal === "edit") {
      console.log("Editing Department", selectedId, data);
      updateDepartment({
        id: selectedId,
        data: { ...data, manager_id: manager_id },
      });
    }
    closeModal();
  };

  return (
    <div className="flex h-full w-full flex-col gap-8">
      {user?.role === "admin" && (
        <PageHeader
          title="Departments"
          buttonText="Create New Department"
          handleAdd={handleAddDepartment}
        />
      )}
      {user?.role === "manager" && <PageHeader title="Departments" />}
      <div className="scrollbar-hidden grid max-h-full overflow-x-hidden rounded-2xl bg-card px-6 py-6 font-primary shadow-custom">
        {user?.role === "admin" && (
          <DataTable
            columns={DepartmentsColumns || []}
            data={(departments as DepartmentsTableColumns[]) || []}
          />
        )}
        {user?.role === "manager" && (
          <DataTable
            columns={DepartmentsManagerColumns || []}
            data={(departments as DepartmentsTableColumns[]) || []}
          />
        )}
      </div>
      <DepartmentForm
        departmentId={selectedId}
        methods={methods}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default DepartmentsPage;
