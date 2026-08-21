import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button, IconButton } from "./Button";
import { cx } from "./utils";
import "./pagination.css";

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination({ page, pageCount, onPageChange, className, ...props }, ref) {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1).filter(
    (candidate) => candidate === 1 || candidate === pageCount || Math.abs(candidate - page) <= 1,
  );

  return (
    <nav ref={ref} className={cx("mds-pagination", className)} aria-label="Pagination" {...props}>
      <IconButton label="Previous page" size="sm" variant="secondary" icon={<ChevronLeft size={14} />} disabled={page <= 1} onClick={() => onPageChange?.(page - 1)} />
      <div className="mds-pagination__pages">
        {pages.map((candidate, index) => {
          const previous = pages[index - 1];
          return (
            <span className="mds-pagination__slot" key={candidate}>
              {previous && candidate - previous > 1 ? <span className="mds-pagination__ellipsis">...</span> : null}
              <Button size="sm" variant={candidate === page ? "primary" : "ghost"} aria-current={candidate === page ? "page" : undefined} onClick={() => onPageChange?.(candidate)}>
                {candidate}
              </Button>
            </span>
          );
        })}
      </div>
      <IconButton label="Next page" size="sm" variant="secondary" icon={<ChevronRight size={14} />} disabled={page >= pageCount} onClick={() => onPageChange?.(page + 1)} />
    </nav>
  );
});
