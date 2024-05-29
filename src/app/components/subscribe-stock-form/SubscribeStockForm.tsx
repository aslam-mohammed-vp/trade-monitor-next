'use client';

import type { SubmitHandler, Validate } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import constants from '@/constants/constants';
import type { HandlerFunctionType } from '@/types/types';
import { Operation } from '@/types/types';

import styles from './subscribe-stock-form.module.scss';

type Inputs = {
  isin: string;
};

export default function SubscribeStockForm({
  validateFn,
  handleSubscribe,
}: {
  validateFn: Validate<string, Inputs>;
  handleSubscribe: HandlerFunctionType;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<Inputs>({ reValidateMode: 'onSubmit' });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (isValid) handleSubscribe(data.isin, Operation.Subscribe);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.subscribeStock}>
        <div className={styles.formControls}>
          <input
            type="text"
            placeholder={constants.placeHolder}
            aria-invalid={!!errors.isin}
            {...register('isin', { required: true, validate: validateFn })}
          />
          <input
            type="submit"
            title={constants.subscribe}
            value={constants.subscribe}
          />
        </div>
        <div>
          {errors.isin && (
            <span className={styles.error}>{errors.isin.message}</span>
          )}
        </div>
      </div>
    </form>
  );
}
