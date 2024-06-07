<template>
  <FormKit
    type="form"
    @submit="submitForm"
    :validation="$validation"
  >
    <FormKit
      name="name"
      label="Name"
      type="text"
      validation="required|min:1"
      :validation-messages="validationMessages.name"
    />
    <FormKit
      name="email"
      label="Email"
      type="email"
      validation="required|email"
      :validation-messages="validationMessages.email"
    />
    <FormKit
      name="password"
      label="Password"
      type="password"
      validation="required|min:8"
      :validation-messages="validationMessages.password"
    />
    <FormKit
      type="submit"
      label="Submit"
    />
  </FormKit>
</template>

<script setup>
import { ref } from 'vue';
import { userSchema } from '../validation';
import { useFormKit } from '@formkit/vue';
import axios from 'axios';

const validationMessages = {
  name: {
    required: 'Name is required',
    min: 'Name must be at least 1 character'
  },
  email: {
    required: 'Email is required',
    email: 'Invalid email address'
  },
  password: {
    required: 'Password is required',
    min: 'Password must be at least 8 characters'
  }
};

const $validation = useFormKit({
  rules: userSchema
});

const submitForm = async (values) => {
  try {
    const response = await axios.post('/api/validate-user', values);
    if (response.data.success) {
      console.log('Server-side validation successful:', response.data.data);
    } else {
      console.error('Server-side validation failed:', response.data.error);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};
</script>
