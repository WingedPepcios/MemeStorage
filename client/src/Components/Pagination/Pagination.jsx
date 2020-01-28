/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { PAGINATION } from '../../Types/Routes';
import './Pagination.scss';

const Pagination = () => {
  const { pagination } = useSelector((state) => state);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pagination]);

  if (pagination) {
    const {
      total,
      next,
      prev,
      page,
    } = pagination;
    return (
      <section className="pagination d-flex align-items-center justify-content-center">
        {
          prev
            ? <Link to={`${PAGINATION}/${prev}`} className="btn --prev mr-4"><i className="fas fa-long-arrow-alt-left" /></Link>
            : null
        }
        <span className="pagination__current mr-4">
          <strong>{page}</strong>
          <span>/{total}</span>
        </span>
        {
          next
            ? <Link to={`${PAGINATION}/${next}`} className="btn --next --solid">Następna strona</Link>
            : null
        }
      </section>
    );
  }
  return null;
};

export default Pagination;
