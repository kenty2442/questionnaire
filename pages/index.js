import { useForm, Controller } from "react-hook-form";
import React from 'react';
import { Container, Input } from '@material-ui/core';

import { db } from "../config/firebase";

export default function Home() {

  const { register, handleSubmit, formState: { errors }, control, watch } = useForm()

  const onSubmit = (data) => {
    db.collection('content').add({
      name: data.name,
      birth: data.birth,
      isLearning: data.isLearning,
      wasLearning: data.wasLearning,
      language: data.language
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    console.log(data)
  };

  return (
    <>
      <Container>
        <h1>プログラミング学習に関するアンケート</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Q1. 名前を入力してください。（匿名可）</label>
            <Controller
              name="name"
              defaultValue=""
              control={control}
              render={({ field: { value, onChange } }) => <Input value={value} onChange={onChange} />}
            />

          </div>
          <div>
            <label htmlFor="birth">Q2. 生年月日を入力してください（例：19941220）</label>
            <Controller
              name="birth"
              defaultValue=""
              control={control}
              rules={{ required: true, pattern: /^[0-9]{8}$/ }}
              render={({ field: { value, onChange } }) => <Input value={value} onChange={onChange} />}
            />
            {
              errors.birth && errors.birth.type === "required" ?
                <span> このフィールドは回答必須です。</span> : null
            }
            {
              errors.birth && errors.birth.type === "pattern" ?
                <span>整数8桁で入力してください</span> : null
            }
          </div>
          <div>
            <span>Q3. 現在、プログラミングを学習していますか？</span>
            <input
              id="isLearning1"
              {...register("isLearning", { required: true })}
              name="isLearning"
              type="radio"
              value="true"
            />
            <label htmlFor="isLearning1">はい</label>

            <input
              id="isLearning2"
              {...register("isLearning")}
              name="isLearning"
              type="radio"
              value="false"
            />
            <label htmlFor="isLearning2">いいえ</label>

            {
              errors.isLearning &&
              <span>このフィールドは回答必須です。</span>
            }

          </div>
          <div>
            <span>Q4. これまでにプログラミングの学習をしたことがありますか？</span>
            <input
              id="wasLearning1"
              {...register("wasLearning", { required: true })}
              name="wasLearning"
              type="radio"
              value="true"
            />
            <label htmlFor="wasLearning1">はい</label>

            <input
              id="wasLearning2"
              {...register("wasLearning")}
              name="wasLearning"
              type="radio"
              value="false"
            />
            <label htmlFor="wasLearning2">いいえ</label>

            {errors.wasLearning &&
              <span> このフィールドは回答必須です。</span>
            }
          </div>
          {
            (watch("isLearning") === 'true' || watch("wasLearning") === 'true') ?
              <>
                <div>
                  <span>Q5. 今まで学習したことのあるプログラミング言語を全て教えて下さい。</span>
                  <Controller
                    name="language"
                    defaultValue=""
                    control={control}
                    render={({ field: { value, onChange } }) => <Input value={value} onChange={onChange} />}
                  ></Controller>
                </div>
              </> : null
          }
          <input type="submit" value='アンケートを提出する' />
        </form>
      </Container>
    </>
  );
};
