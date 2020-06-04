/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import './Pagination.scss';

const Pagination = () => {
  const { pagination } = useSelector((state) => state);
  const { pathname, search } = useLocation();

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
    let nextLink = pathname;
    let prevLink = pathname;
    if (next) {
      const query = queryString.parse(search, { arrayFormat: 'comma' });
      if (query.page) query.page = parseInt(query.page, 10) + 1;
      else query.page = 2;
      nextLink = `${pathname}?${queryString.stringify(query, ',')}`;
    }
    if (prev) {
      const query = queryString.parse(search, { arrayFormat: 'comma' });
      if (query.page) query.page = parseInt(query.page, 10) - 1;
      prevLink = `${pathname}?${queryString.stringify(query, ',')}`;
    }
    return (
      <section className="pagination d-flex align-items-center justify-content-center">
        {
          prev
            ? <Link to={prevLink} className="btn --prev mr-4"><i className="fas fa-long-arrow-alt-left" /></Link>
            : null
        }
        <span className="pagination__current mr-4">
          <strong>{page}</strong>
          <span>/{total}</span>
        </span>
        {
          next
            ? <Link to={nextLink} className="btn --next --solid">Następna strona</Link>
            : null
        }
      </section>
    );
  }
  return null;
};

export default Pagination;
