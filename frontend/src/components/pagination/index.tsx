import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';
import { EllipsisButton, NavigationButton, PageButton, PaginationContainer } from './style';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};



const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4];
    }

    if (currentPage >= totalPages - 2) {
      return [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  };

  const visiblePages = getVisiblePages();
  const showStartEllipsis = visiblePages[0] > 1;
  const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages;

  return (
    <PaginationContainer>
      <NavigationButton
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon size={16} />
      </NavigationButton>

      {showStartEllipsis && (
        <>
          <PageButton
            variant="outline"
            onClick={() => onPageChange(1)}
            $isActive={false}
          >
            1
          </PageButton>
          <EllipsisButton>
            <MoreHorizontalIcon size={16} />
          </EllipsisButton>
        </>
      )}

      {visiblePages.map((page) => (
        <PageButton
          key={page}
          variant={currentPage === page ? 'primary' : 'outline'}
          onClick={() => onPageChange(page)}
          $isActive={currentPage === page}
        >
          {page}
        </PageButton>
      ))}

      {showEndEllipsis && (
        <>
          <EllipsisButton>
            <MoreHorizontalIcon size={16} />
          </EllipsisButton>
          <PageButton
            variant="outline"
            onClick={() => onPageChange(totalPages)}
            $isActive={false}
          >
            {totalPages}
          </PageButton>
        </>
      )}

      <NavigationButton
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRightIcon size={16} />
      </NavigationButton>
    </PaginationContainer>
  );
};

export default Pagination;
