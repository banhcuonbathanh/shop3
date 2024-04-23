import { useRouter } from "next/router";
import styles from "./pagination.module.css";

interface PaginationProps {
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ page, hasPrev, hasNext }) => {
  const router = useRouter();

  const goToPage = (newPage: number) => {
    router.push(`/?page=${newPage}`);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => goToPage(page - 1)}
      >
        Previous
      </button>
      <button
        disabled={!hasNext}
        className={styles.button}
        onClick={() => goToPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
