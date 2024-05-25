"use client";
import styles from "./subscribe-stock-form.module.scss";
import { SubmitHandler, Validate, useForm } from "react-hook-form";
import { HandlerFunctionType, Operation } from "@/types/types";
import constants from "@/constants/constants";

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
  } = useForm<Inputs>({ reValidateMode: "onSubmit" });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("came here with isValid", errors);
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
            aria-invalid={errors.isin ? true : false}
            {...register("isin", { required: true, validate: validateFn })}
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
