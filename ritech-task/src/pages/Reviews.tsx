import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import { useAllReviews } from "@/hooks/manager/review/useAllReviews";
import { EmployeeAndManagerReviewColumns, EmployeeAndManagerReviewTableColumnsType } from "@/utils/tableUtils/columns";
import { DataTable } from "@/utils/tableUtils/dataTable";

function Reviews() {
  const { isLoading, allReviews } = useAllReviews();
  if (isLoading) return <Loader />;
  console.log(allReviews);
  return (
    <div className="flex h-full w-full flex-col gap-8">
      <PageHeader title="Reviews" />
      <div className="scrollbar-hidden grid max-h-full overflow-x-hidden rounded-2xl bg-card px-6 py-6 font-primary shadow-custom">
        <DataTable
          columns={EmployeeAndManagerReviewColumns}
          data={allReviews as EmployeeAndManagerReviewTableColumnsType[]}
        />
      </div>
    </div>
  );
}

export default Reviews;
