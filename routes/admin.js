const { validateDoctor } = require('../validators/admin/doctorValidator');
const { validateStaff } = require('../validators/admin/staffValidator');
const { validateRole } = require('../validators/admin/roleValidator');
const { validateSpecialization } = require('../validators/admin/specializationValidator');

router.post('/doctors', validateDoctor, doctorController.createDoctor);
router.post('/staff', validateStaff, staffController.createStaff);
router.post('/roles', validateRole, roleController.createRole);
router.post('/specializations', validateSpecialization, specializationController.createSpecialization);
