// import { useGetModelsQuery } from '@/app/api/mlModelsApi';
// import { MlModels } from '@/lib/types/section';
import { MlModelCard } from '@/components';

const MlModal: React.FC = () => {
  // const { data, isLoading } = useGetModelsQuery();

  // if (isLoading) {
  //   return <div className="mt-96">Loading...</div>;
  // }

  return (
    <>
      {/* <h1 className="mt-96">Hello this is data page</h1>
      {data &&
        data.map((value: MlModels) => (
          <div key={value._id}>
            <h1 className="text-2xl">{value.name}</h1>
            <h3 className="text-xl">{value.description}</h3>
            <h6 className="text-sm">{value.price}</h6>
          </div>
        ))} */}
      <MlModelCard />
      <MlModelCard />
    </>
  );
};

export default MlModal;
