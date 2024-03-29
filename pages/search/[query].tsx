import { Basic } from 'components/styled';
import { NoResultsIcons } from 'components/styled/icons';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { IProduct } from '../../interfaces/product';
import { ProductSearched } from '../../components/product/ProductSearched';
import { GetServerSideProps, NextPage } from 'next';
import { findProductByQuery } from '../../controllers/product-controller';

interface Props {
  products: IProduct[];
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, query }) => {
  return (
    <ShopLayout title={query + ' | Market'} pageDescription="">
      {products.length === 0 ? (
        <div className="w-full flex ">
          <Basic
            icon={<NoResultsIcons className="w-full" />}
            color=" w-full  h-full lg:mt-20"
          >
            <h2 className="card-title md:text-3xl">
              No results with: <span className="text-blue-500">{query}</span>
            </h2>
          </Basic>
        </div>
      ) : (
        <div className={`relative pb-20 w-full `}>
          <div className="flex flex-col  text-start items-center mt-8 xl:mt-10 mb-8">
            <div className="w-4/5 pb-5 grid gap-2">
              <h4 className="text-black text-3xl font-bold">{query}</h4>
              <span className="text-primaryA">{products.length} results</span>
            </div>
            <div className="flex flex-wrap gap-4">
              {products.map((product: IProduct) => (
                <ProductSearched
                  key={product.id}
                  title={product.name}
                  price={product.price}
                  images={product.images}
                  description={product.description}
                  id={product.id}
                />
              ))}
            </div>
            {/* {data?.pagination?.total && (
            <div className="absolute bottom-0 flex justify-center mb-8">
              <Pagination
                currentPage={[...numberOfPages]}
                totalPages={totalPage}
                handlerPrev={() => {
                  setCurrentPage(currentPage - 1);
                  totalPage > 1 && setOffSet((prev) => prev - 5);
                }}
                handlerNext={() => {
                  setCurrentPage(currentPage + 1);
                  totalPage > 1 && setOffSet((prev) => prev + 5);
                }}
                activePage={currentPage}
                handler={(page: any) => {
                  setCurrentPage(page);
                }}
              />
            </div>
          )} */}
          </div>
        </div>
      )}
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  const products = await findProductByQuery(query);

  return {
    props: {
      products,
      query,
    },
  };
};

export default SearchPage;
