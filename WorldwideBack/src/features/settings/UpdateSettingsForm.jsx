import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useEditSetting } from './useEditSetting';
import { useSettings } from './useSettings';

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      breakfastPrice,
      maxGuestsPerBooking,
    } = {},
  } = useSettings();
  const { isEditing, editSetting } = useEditSetting();
  if (isLoading) return <Spinner />;

  function handleUpldate(e, field) {
    const value = e.target.value;
    editSetting({ [field]: value });
  }
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          id='min-nights'
          disabled={isEditing}
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpldate(e, 'minBookingLength')}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpldate(e, 'maxBookingLength')}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpldate(e, 'maxGuestsPerBooking')}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          type='number'
          id='breakfast-price'
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpldate(e, 'breakfastPrice')}
          disabled={isEditing}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
