import { useEffect, useState, React } from 'react';
import Meme from '../api/Meme';
import Form from './Form';

function Sort() {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch('https://api.reykez.pl/api/memes/meme-categories', {
      method: 'GET',
      headers: {
        Accept: 'application/x-www-form-urlencoded'
      }
    })
      .then((res) => res.json())
      .then((category) => {
        const duration = category._embedded.items;
        setCategory(duration);
      });
  }, []);

  const [type, setType] = useState([]);
  useEffect(() => {
    fetch('https://api.reykez.pl/api/memes/meme-types', {
      method: 'GET',
      headers: {
        Accept: 'application/x-www-form-urlencoded'
      }
    })
      .then((res) => res.json())
      .then((type) => {
        const duration = type._embedded.items;
        setType(duration);
      });
  }, []);

  const [formErrors, setFormErrors] = useState({});

  const formFields = ['category', 'type', 'isNsfw', 'isUncropped', 'isMeme'];
  const [form, setForm] = useState({
    category: '',
    type: '',
    isNsfw: '',
    isUncropped: '',
    isMeme: ''
  });

  useEffect(() => {
    let errors = {};

    formFields.forEach(function (key) {
      let value = form[key];

      if (value === undefined) {
        errors[key] = true;
      } else {
        errors[key] = false;
      }
    });
    setFormErrors(errors);
  }, [form]);

  function handleSubmit(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    let formData = Object.fromEntries(data.entries());
    setForm(formData);
    return;
  }

  function BooleanChooseField({ fieldName, idValueDictionary }) {
    return (
      <ul className="grid gap-6 w-full md:grid-cols-2">
        {idValueDictionary.map((option) => {
          return (
            <li>
              <p className="mb-5"></p>
              <input type="radio" className="hidden peer" name={fieldName} id={option.id} value={option.value} />
              <label htmlFor={option.id} className="invalid:border-red-500 inline-flex justify-between items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-900 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                <p className="text-red-300">{formErrors[fieldName] ? 'ERROR' : ''}</p>
                <div className="block">
                  <div className="w-full text-lg font-semibold">Kategoria</div>
                  <div className="w-full">{option.text}</div>
                </div>
              </label>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <>
      <main className="bg-gray-600 flex justify-center h-[90vh]">
        <a href="#" className="flex flex-col items-center rounded-lg border shadow-md md:flex-row md:max-w-auto border-gray-700 bg-gray-700">
          <Meme />
          <div className="flex flex-col justify-between pb-28 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-amber-700 ">Sortowanie memów</h5>
            <div className="mb-3">
              <form name="Form" action="patch" onSubmit={handleSubmit} noValidate>
                <p className="text-red-300">{formErrors['category'] ? 'ERROR' : ''}</p>
                <select name={category} className="flex bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full" defaultValue="Kategoria">
                  <option disabled>Kategoria</option>
                  {category.map((item, i) => {
                    return (
                      <option key={i} value={item.id}>
                        {item.id}
                      </option>
                    );
                  })}
                </select>
                <p className="text-red-300">{formErrors['type'] ? 'ERROR' : ''}</p>
                <select name={type} value={Form.values} className="flex mt-3 mb-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full" defaultValue="Typ">
                  <option disabled>Typ</option>
                  {type.map((item, i) => {
                    return (
                      <option key={i} value={item.id}>
                        {item.id}
                      </option>
                    );
                  })}
                </select>
                <BooleanChooseField
                  fieldName="isNsfw"
                  idValueDictionary={[
                    { id: 'sfw', value: true, text: 'SFW' },
                    { id: 'nsfw', value: false, text: 'NSFW' }
                  ]}
                />
                <BooleanChooseField
                  fieldName="isUncropped"
                  idValueDictionary={[
                    { id: 'cropped', value: true, text: 'Cropped' },
                    { id: 'uncropped', value: false, text: 'Uncropped' }
                  ]}
                />
                <BooleanChooseField
                  fieldName="isMeme"
                  idValueDictionary={[
                    { id: 'meme', value: true, text: 'Meme' },
                    { id: 'notmeme', value: false, text: 'Not Meme' }
                  ]}
                />
                <button id="submit" type="submit" className="flex mt-3 mb-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full" onClick={Form.handleSubmit}>
                  Sortuj!
                </button>
              </form>
            </div>
          </div>
        </a>
      </main>
    </>
  );
}

export default Sort;
